import { test, expect, beforeEach, describe } from "@playwright/test";
import { login, createBlog } from "./helper.js";

const user = 
{
  username: "Lolik",
  name: "Andrew",
  password: "3123131",
}

const user2 = {
  username: "user2",
  name: "user2",
  password: "user2",
}

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: user
    });
    await page.goto("http://localhost:5173");
    await page.getByRole('link', { name: 'login' }).click()
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, "Lolik", "3123131");

      await expect(page.getByText("wrong credentials")).not.toBeVisible();
      await expect(page.getByText(`Andrew logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await login(page, "Lolik", "wrongPassword");
      await expect(page.getByText("wrong credentials")).toBeVisible();
      await expect(page.getByText(`Andrew logged in`)).not.toBeVisible();
    });
  });
});

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: user
    });
    await page.goto("http://localhost:5173");
    await page.getByRole('link', { name: 'login' }).click()
    await login(page, "Lolik", "3123131");
    await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
  })

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, 'testBlog', 'Blogger', 'blog.com')
    await expect(page.getByText('a new blog testBlog by Blogger added!')).toBeVisible();
    await expect(page.getByRole('link', {name: 'testBlog by Blogger' })).toBeVisible();
  })
  
  test('Unauthenticated user can see bloglist, can`t see like and remove button', async ({ page }) => {
    await createBlog(page, 'testBlog', 'Blogger', 'blog.com')
    await expect(page.getByText('a new blog testBlog by Blogger added!')).toBeVisible();

    await page.getByRole("button", { name: "Log Out" }).click();
    await expect(page.getByRole('link', { name: 'login' })).toBeVisible()

    await page.getByRole('link', { name: 'testBlog by Blogger' }).click()
    await expect(page.getByText('Blogger: testBlog')).toBeVisible();
    await expect(page.getByText('blog.com')).toBeVisible();
    await expect(page.getByText('Added by Andrew')).toBeVisible();
    await expect(page.getByRole('button', { name: 'like' })).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

  })
  
  test('a blog can be liked', async ({ page }) => {
    await createBlog(page, 'testBlog', 'Blogger', 'blog.com')
    await page.getByRole('link', { name: 'testBlog by Blogger' }).click()
    await page.getByRole('button', { name: 'like' }).click();
    await expect(page.getByText('1')).toBeVisible();
  })

  test('a blog can be deleted', async ({ page }) => {
    await createBlog(page, 'testBlog', 'Blogger', 'blog.com')
    await page.getByRole('link', { name: 'testBlog by Blogger' }).click()
    await expect(page.getByText('Blogger: testBlog')).toBeVisible();

    page.once('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'remove' }).click()

    await expect(page.getByText('blogs')).toBeVisible()
    await expect(page.getByRole('link', {name: 'testBlog by Blogger' })).not.toBeVisible();
  })

  test('blog with most likes appears first', async ({ page }) => {
    await createBlog(page, 'Blog with zero likes', 'AuthorOne', 'exone.com');

    await createBlog(page, 'Blog with one like', 'AuthorSec', 'exsec.com');

    await page.getByRole('link', { name: 'Blog with one like by AuthorSec' }).click();
    await page.getByRole('button', { name: 'like' }).click();
    await expect(page.getByText('1')).toBeVisible();

    await page.getByRole('link', { name: 'blogs' }).click();
    await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible();

    const firstBlogInList = page.locator('li').first();
    await expect(firstBlogInList).toContainText('Blog with one like');
  });
})

describe('When created and logged in 2 accounts for manipulation', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', { data: user })
    await request.post('http://localhost:3003/api/users', { data: user2 })

    await page.goto('http://localhost:5173')
    await page.getByRole('link', { name: 'login' }).click()
    await login(page, 'Lolik', '3123131')
    await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
  })

  test('only creator of blog can see delete and like button', async ({ page }) => {
    await createBlog(page, 'testBlog', 'Blogger', 'blog.com')

    await page.getByRole('link', { name: 'testBlog by Blogger' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'like' })).toBeVisible()

    await page.getByRole('button', { name: 'Log Out' }).click()

    await page.getByRole('link', { name: 'login' }).click()
    await login(page, 'user2', 'user2')
    await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();

    await page.getByRole('link', { name: 'testBlog by Blogger' }).click()

    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'like' })).not.toBeVisible()
  })
})

