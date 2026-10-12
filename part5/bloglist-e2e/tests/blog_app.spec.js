import { test, expect, beforeEach, describe } from "@playwright/test";
import { login } from "./helper.js";

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
    await page.getByRole("button", { name: "create new blog" }).click();
    await page.getByLabel("title:").fill('testBlog');
    await page.getByLabel("author:").fill('Blogger');
    await page.getByLabel("url:").fill('blog.com');
    await page.getByRole("button", { name: "create" }).click();
    await expect(page.getByText("a new blog testBlog by Blogger added!")).toBeVisible();
    await expect(page.getByText("testBlog - Blogger")).toBeVisible();
  })
}) 
