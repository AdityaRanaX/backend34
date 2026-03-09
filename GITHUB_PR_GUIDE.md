# GitHub & Pull Request Setup Guide

## Overview

This guide walks you through:
1. Setting up Git
2. Creating a feature branch
3. Committing code
4. Pushing to GitHub
5. Creating a Pull Request

## Prerequisites

- GitHub account (https://github.com)
- Git installed on your computer
- Your GitHub repository: https://github.com/AdityaRanaX/backend34

## Step 1: Clone the Repository (If Not Done)

```bash
git clone https://github.com/AdityaRanaX/backend34.git
cd backend34
```

## Step 2: Verify Git Configuration

```bash
# Check your git config
git config --list

# Set up your GitHub credentials (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/backend-foundation

# Verify you're on the new branch
git branch
```

You should see:
```
  master
* feature/backend-foundation
```

## Step 4: Check What Changed

```bash
# See all modified/new files
git status
```

You should see:
```
On branch feature/backend-foundation
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .env.example
        .gitignore
        INSTALLATION.md
        README.md
        config/database.js
        controllers/userController.js
        middleware/errorHandler.js
        models/User.js
        routes/userRoutes.js
        server.js
        test.rest
        package.json
        package-lock.json
        Creator-Platform-Backend.postman_collection.json
```

## Step 5: Stage Your Changes

```bash
# Add all files
git add .

# Or add specific files
git add server.js
git add package.json
```

## Step 6: Commit Your Changes

```bash
git commit -m "feat: implement backend foundation for creators platform

- Set up Express.js server with MongoDB integration
- Implement User model with bcrypt password hashing
- Create user controllers for CRUD operations
- Set up RESTful API routes
- Add error handling middleware
- Configure environment variables
- Add comprehensive documentation and API testing files"
```

## Commit Message Guidelines

Use this format:
```
type(scope): subject line

body with detailed explanation
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring

## Step 7: Push to GitHub

```bash
# Push the branch to GitHub
git push origin feature/backend-foundation
```

Output should be:
```
Enumerating objects: ...
Counting objects: ...
Delta compression using up to 8 threads
Compressing objects: ...
Writing objects: ...
remote: Create a pull request for 'feature/backend-foundation' on GitHub by visiting:
remote: https://github.com/AdityaRanaX/backend34/pull/new/feature/backend-foundation
```

## Step 8: Create a Pull Request on GitHub

### Method 1: Using GitHub Website (Recommended)

1. Go to https://github.com/AdityaRanaX/backend34
2. Click the "Pull requests" tab
3. Click "New pull request" or use the prompt that appears
4. Select:
   - Base branch: `main` (or `master`)
   - Compare branch: `feature/backend-foundation`
5. Click "Create pull request"

### Method 2: Using GitHub CLI

```bash
# Install GitHub CLI from https://cli.github.com/
gh pr create --title "Backend Foundation" \
  --body "Implements complete backend for Creator's Platform"
```

## Step 9: Fill in the PR Details

### PR Title
```
✨ Backend Foundation: User Management API
```

### PR Description

Use this template:

```markdown
## Description
Implements the complete backend foundation for Creator's Platform with:
- MongoDB integration using Mongoose
- User registration and management
- RESTful API endpoints for user CRUD operations
- Secure password hashing with bcrypt
- Comprehensive error handling

## Tasks Completed
- [x] Database configuration (MongoDB + Mongoose)
- [x] User model with validation
- [x] Controllers for CRUD operations
- [x] RESTful API routes
- [x] Error handling middleware
- [x] Environment configuration
- [x] API documentation
- [x] Postman collection for testing

## How to Test
1. Create .env file with MongoDB URI
2. Run `npm install`
3. Run `npm start` to start the server
4. Use Postman or REST Client to test endpoints
5. See INSTALLATION.md for detailed setup instructions

## Video Demo
[Link to your Google Drive video - add after recording]

## Files Changed
- Created: server.js, User model, Controllers, Routes
- Created: Configuration and middleware files
- Created: Documentation (README, INSTALLATION, API tests)
- Created: Node.js dependencies (package.json)

## Checklist
- [ ] Code follows project structure
- [ ] All API endpoints working
- [ ] Passwords properly hashed
- [ ] Error handling implemented
- [ ] No .env file committed
- [ ] Video demo recorded
- [ ] Documentation complete
```

## Step 10: Request Review

After creating the PR:

1. Click "Reviewers" on the right side
2. Add any teacher/mentor profile if required
3. Add labels like "backend", "enhancement"
4. Leave a comment tagging reviewers (if needed)

## Step 11: Update PR if Needed

If reviewers request changes:

```bash
# Make changes locally
# For example, edit server.js

# Stage changes
git add .

# Commit with a message
git commit -m "fix: update error handling in server.js"

# Push to the same branch
git push origin feature/backend-foundation
```

The PR will automatically update!

## Useful Git Commands

```bash
# Check current branch status
git status

# View commit history
git log --oneline

# View changes before committing
git diff

# Undo changes to a file
git checkout -- filename

# Undo last commit (before pushing)
git reset --soft HEAD~1

# Switch branches
git checkout main

# Delete local branch
git branch -d feature/backend-foundation

# Delete remote branch
git push origin -d feature/backend-foundation
```

## Important Notes

### Don't Commit These Files
- `.env` - Keep in .gitignore (already configured)
- `node_modules/` - Keep in .gitignore (already configured)
- `.DS_Store` - macOS files (in .gitignore)
- `*.log` - Log files (in .gitignore)

### The .gitignore file already covers these!

## Verify Before Pushing

```bash
# Check what will be pushed
git diff --cached

# Ensure .env is NOT included
git ls-files | grep -i ".env"
# Should only show .env.example, NOT .env
```

## PR Review Process

1. Reviewers will check:
   - Code quality and structure
   - API functionality
   - Database integration
   - Error handling
   - Documentation

2. If changes are requested:
   - Make the changes locally
   - Commit and push to the same branch
   - PR updates automatically

3. Once approved:
   - You can merge the PR
   - The code goes to main branch

## After PR is Merged

```bash
# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# Delete feature branch locally
git branch -d feature/backend-foundation
```

## Troubleshooting

### Issue: "Would clobber existing tag"
```bash
# Delete and recreate remote branch
git push origin -d feature/backend-foundation
git push origin feature/backend-foundation
```

### Issue: Accidental commit to main
```bash
# Create new branch from main
git checkout -b feature/backend-foundation

# Reset main to previous state
git checkout main
git reset --hard HEAD~1
```

### Issue: .env got committed
```bash
# Remove .env from git history
git rm --cached .env
git commit -m "Remove .env from tracking"
git push origin feature/backend-foundation
```

## Next Steps

1. ✅ Create feature branch
2. ✅ Make changes and commit
3. ✅ Push to GitHub
4. ✅ Create Pull Request
5. ⏭️ Request review (if needed)
6. ⏭️ Record video demo (see VIDEO_DEMO.md)
7. ⏭️ Add video link to PR
8. ⏭️ Monitor for feedback and respond to comments
9. ⏭️ Submit completed PR link for evaluation
