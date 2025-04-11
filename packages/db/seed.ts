import { createId } from "@paralleldrive/cuid2";
import { db } from "./index";
import { user, posts } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create users
  const userIds = [];
  const userEmails = [
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com",
    "dave@example.com",
    "eve@example.com",
  ];

  console.log("Creating users...");
  for (let i = 0; i < userEmails.length; i++) {
    const userId = createId();
    userIds.push(userId);
    
    await db.insert(user).values({
      id: userId,
      name: `User ${i + 1}`,
      email: userEmails[i],
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: i === 0 ? "admin" : "user", // First user is admin, rest are regular users
    });
    
    console.log(`Created user: ${userEmails[i]}`);
  }

  // Create posts
  console.log("Creating posts...");
  const postTitles = [
    "Getting Started with Turborepo",
    "Building Scalable Applications",
    "The Power of Monorepos",
    "Modern Web Development",
    "Full Stack TypeScript",
    "React Best Practices",
    "API Design Patterns",
    "Database Optimization Techniques",
    "Authentication Strategies",
    "Deploying to Production",
  ];

  const postContents = [
    "This is a comprehensive guide to getting started with Turborepo...",
    "Learn how to build scalable applications using modern tools...",
    "Monorepos offer numerous advantages for managing complex projects...",
    "Explore the latest trends and techniques in web development...",
    "TypeScript provides end-to-end type safety for your applications...",
    "Discover the best practices for building React applications...",
    "Design robust and scalable APIs with these patterns...",
    "Optimize your database queries for better performance...",
    "Implement secure authentication in your applications...",
    "A step-by-step guide to deploying your application to production...",
  ];

  for (let i = 0; i < postTitles.length; i++) {
    // Assign posts to random users
    const authorId = userIds[Math.floor(Math.random() * userIds.length)];
    
    await db.insert(posts).values({
      id: createId(),
      title: postTitles[i],
      content: postContents[i],
      authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log(`Created post: ${postTitles[i]}`);
  }

  console.log("✅ Seeding complete!");
}

// Run the seed function
seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    // Close the database connection when done
    process.exit(0);
  });