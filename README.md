# Diagnostic Huile - Oil Diagnostic Form

A beautiful, elegant multi-step form application built with Next.js, TypeScript, and Tailwind CSS. Users answer 10 personalized questions and receive tailored oil recommendations based on their skin and hair needs.

## Features

✨ **Multi-Step Form**
- 10 engaging questions about skin type, hair type, and personal preferences
- One question per step for a focused user experience
- Progress bar showing completion percentage
- Smooth transitions and animations between steps

🎯 **Smart Recommendation Engine**
- Scoring system based on user answers
- Personalized oil recommendations
- Avoidance of oils user doesn't want
- Three recommendation types: single oil, two complementary oils, or full routine

🎨 **Premium Design**
- Warm, elegant color palette (brown, beige, cream, gold)
- Mobile-first responsive design
- Smooth animations and transitions
- Confetti celebration on results screen

🌍 **Language Support**
- French interface with Moroccan/Darija context
- Personalized recommendations with usage tips

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── DiagnosticForm.tsx  # Main form component
│   └── Confetti.tsx        # Confetti animation
└── data/
    ├── questions.ts        # Questions and oils data
    └── recommendations.ts  # Recommendation logic
```

## Customization Guide

### Adding/Editing Questions

Edit `src/data/questions.ts` in the `QUESTIONS` array:

```typescript
{
  id: 'questionId',
  text: 'Your question here?',
  type: 'single',
  options: [
    { 
      id: 'optionId', 
      label: 'Option label',
      scores: { argan: 5, nigelle: 3, ... }
    }
  ]
}
```

### Adding/Editing Oils

Edit `src/data/questions.ts` in the `OILS` object:

```typescript
oilId: {
  id: 'oilId',
  name: 'English Name',
  frenchName: 'Nom Français',
  description: 'Description',
  benefits: ['Benefit 1', 'Benefit 2', ...],
  bestFor: ['Use case 1', 'Use case 2', ...],
  texture: 'light' | 'rich',
  usageTips: 'How to use'
}
```

### Recommendation Scoring

Each option has a `scores` object that awards points to oils:
- Higher scores = more likely to be recommended
- The recommendation engine sums all scores from selected answers
- Top-scoring oils are recommended based on user preference (single, two, or routine)

### Customizing Colors

Edit `tailwind.config.ts` colors section:

```typescript
colors: {
  primary: '#8B6F47',      // Main warm brown
  beige: '#F5F1ED',        // Light background
  cream: '#FBF8F3',        // Cream background
  gold: '#D4A574',         // Accent gold
  'dark-brown': '#5D4E37', // Dark text
}
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React** - UI library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT

## Notes

- **No Backend Required**: Currently uses client-side state management
- **Easy to Edit**: Questions and oils data are separated for easy maintenance
- **Scalable**: Simple to add more questions or oils
- **Performance**: Optimized with Next.js and Tailwind CSS

## Future Enhancements

- Backend API for saving recommendations
- Email recommendations to user
- Social sharing of results
- More languages support
- Analytics tracking
- A/B testing capabilities
