import { test, expect, beforeEach, describe } from "@playwright/test";

const login = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url ) => {
  await page.getByRole('link', { name: 'new blog' }).click()
  await expect(page.getByText('create new')).toBeVisible();
  
  await page.getByLabel("title:").fill(title);
  await page.getByLabel("author:").fill(author);
  await page.getByLabel("url:").fill(url);
  await page.getByRole("button", { name: "create" }).click();
}

export { login, createBlog };
