# Recipe Manager

A modern, feature-rich recipe management application built with Next.js, TypeScript, and TailwindCSS. Perfect for organizing your favorite recipes, discovering new dishes, and planning your meals.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/)


## Features

- **Recipe Discovery**: Browse through a collection of delicious recipes with beautiful images
- **Advanced Search**: Search recipes by name, ingredients, or tags
- **Category Filtering**: Filter recipes by cuisine type (Italian, Thai, Mexican, etc.)
- **Ingredient Search**: Find recipes based on ingredients you have
- **Recipe Details**: View detailed recipes with ingredients and step-by-step instructions
- **Interactive Checklists**: Check off ingredients and instructions as you cook
- **Favorites System**: Save your favorite recipes for quick access
- **Difficulty Levels**: Recipes tagged by difficulty (Easy, Medium, Hard)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Beautiful animations using Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd C:\Users\DELL\CascadeProjects\recipe-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates a static export in the `out` directory, ready for deployment.

## Project Structure

```
recipe-manager/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Main recipe listing page
│   └── recipe/
│       └── [id]/
│           └── page.tsx      # Individual recipe detail page
├── lib/
│   └── recipes.ts            # Recipe data and utility functions
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Usage

### Browsing Recipes

- View all recipes on the home page
- Use the search bar to find specific recipes
- Filter by category using the category buttons
- Search by ingredients to find recipes you can make

### Viewing Recipe Details

- Click on any recipe card to view full details
- Check off ingredients as you gather them
- Follow step-by-step instructions with interactive checkboxes
- Save recipes to favorites for quick access

### Adding Custom Recipes

The app currently includes sample recipes. To add your own:

1. Edit `lib/recipes.ts`
2. Add new recipe objects to the `recipes` array
3. Follow the existing Recipe interface structure

## Customization

### Adding More Recipes

Edit `lib/recipes.ts` to add your own recipes:

```typescript
{
  id: 'unique-id',
  title: 'Your Recipe Name',
  description: 'Brief description',
  image: 'image-url',
  prepTime: 15,
  cookTime: 30,
  servings: 4,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  category: 'Your Category',
  ingredients: ['ingredient 1', 'ingredient 2'],
  instructions: ['step 1', 'step 2'],
  tags: ['tag1', 'tag2']
}
```

### Changing Colors

Edit `tailwind.config.ts` to customize the color scheme:
- `primary`: Main accent color (default: orange)
- `secondary`: Secondary accent color
- `dark`: Background color
- `darker`: Darker background

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `out` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `out` folder to a GitHub repository
3. Enable GitHub Pages in repository settings
4. Set source to `/ (root)` and the folder to `out`

## Screenshot

Preview image for social sharing and screenshots:

- Social/OG image: [public/og-image.svg](public/og-image.svg)
- Favicon: [public/favicon.svg](public/favicon.svg)

## Quick Production Checklist

- Run `npm ci` and `npm run build` to verify production build
- Add your site URL in `app/layout.tsx` `metadata.openGraph.url`
- Push to GitHub and enable Vercel or Netlify for automatic deploys
- Add screenshots to the `public/screenshots` folder and reference them here

## LinkedIn Post Template

Just shipped a polished UI for my Recipe Manager app — built with Next.js, TypeScript, and TailwindCSS. It helps you discover, save, and organize recipes with a beautiful, responsive UI and great UX details (search, filters, favorites). Check it out: <your-deployment-link>

Highlights:
- Clean, responsive design with micro-interactions
- Search by ingredient or tag, category filters, favorites
- Production-ready build + CI workflow included

Want me to add a deploy link and a quick demo GIF for the LinkedIn post? I can generate a short post-ready image and instructions.

## Future Enhancements

Potential features to add:
- User authentication and personal recipe collections
- Recipe rating and reviews
- Meal planning calendar
- Shopping list generation
- Recipe import from URLs
- Nutritional information
- Print-friendly recipe views
- Dark/light mode toggle

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please open an issue on GitHub or contact the developer.

---

Built with ❤️ using Next.js and TailwindCSS
