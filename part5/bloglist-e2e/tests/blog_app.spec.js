import { test, expect, beforeEach, describe } from "@playwright/test";
import { login, createBlog } from "./helper.js";

const user = 
{
  username: "Lolik",
  name: "Andrew",
  password: "3123131",
}

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: user
    });
    await page.goto("http://localhost:5173");
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
    await login(page, "Lolik", "3123131");
  })

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, 'testBlog', 'Blogger', 'blog.com')
    await expect(page.getByText(`a new blog testBlog by Blogger added!`)).toBeVisible();
    await expect(page.getByText('testBlog - Blogger')).toBeVisible();
  })
  
  test('a blog can be liked', async ({ page }) => {
  await createBlog(page, 'testBlog', 'Blogger', 'blog.com')

  await page.getByRole('button', { name: 'show' }).click();
  await page.getByRole('button', { name: 'like' }).click();

  await expect(page.getByText('1')).toBeVisible();
  })

  test('a blog can be deleted', async ({ page }) => {
  await createBlog(page, 'testBlog', 'Blogger', 'blog.com')
  await page.getByRole('button', { name: 'show' }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'remove' }).click();
  await expect(page.getByText('testBlog - Blogger')).not.toBeVisible();
  })
}) 
