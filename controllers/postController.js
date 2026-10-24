
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dataFile = fileURLToPath(
  new URL("../data/posts.json", import.meta.url)
);

const allowedFields = ["title", "content", "author", "category"];

// Read and write posts in the JSON data file
async function readPosts() {
  const data = await readFile(dataFile, "utf8");
  return JSON.parse(data);
}

async function writePosts(posts) {
  await writeFile(dataFile, JSON.stringify(posts, null, 2), "utf8");
}

// Validate the required fields when creating a post
function validatePost(body) {
  const requiredFields = ["title", "content", "author", "category"];
  const errors = [];

  for (const field of requiredFields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      errors.push(`${field} is required and must be a non-empty string`);
    }
  }

  return errors;
}

// CREATE: POST /posts
export async function createPost(req, res, next) {
  try {
    const errors = validatePost(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const posts = await readPosts();

    const newPost = {
      id: randomUUID(),
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      author: req.body.author.trim(),
      category: req.body.category.trim(),
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await writePosts(posts);

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
}

// READ ALL: GET /posts
export async function getAllPosts(req, res, next) {
  try {
    const posts = await readPosts();

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

// READ ONE: GET /posts/:id
export async function getPostById(req, res, next) {
  try {
    const posts = await readPosts();
    const post = posts.find((item) => item.id === req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

// UPDATE: PUT /posts/:id
export async function updatePost(req, res, next) {
  try {
    const entries = Object.entries(req.body);

    if (entries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const invalidFields = entries
      .map(([key]) => key)
      .filter((key) => !allowedFields.includes(key));

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields provided",
        errors: invalidFields,
      });
    }

    for (const [field, value] of entries) {
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a non-empty string`,
        });
      }
    }

    const posts = await readPosts();
    const index = posts.findIndex(
      (item) => item.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const updates = Object.fromEntries(
      entries.map(([key, value]) => [key, value.trim()])
    );

    posts[index] = {
      ...posts[index],
      ...updates,
    };

    await writePosts(posts);

    return res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: posts[index],
    });
  } catch (error) {
    next(error);
  }
}

// DELETE: DELETE /posts/:id
export async function deletePost(req, res, next) {
  try {
    const posts = await readPosts();
    const index = posts.findIndex(
      (item) => item.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const [deletedPost] = posts.splice(index, 1);
    await writePosts(posts);

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
}
