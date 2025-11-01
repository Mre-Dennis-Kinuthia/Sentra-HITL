# Sentra - Human-in-the-Loop Data Annotation Platform MVP

A fully navigable frontend MVP of Sentra, a comprehensive data annotation platform by Tessellations. This implementation showcases all key modules with mocked data and interactions.

## Features

### Authentication & Access Control
- Mocked authentication system with role-based access
- Four user roles: Admin, Annotator, QA Reviewer, Client
- Demo accounts for easy testing
- Session management with localStorage

### Core Modules

#### 1. Sentra Annotate
- Image annotation with interactive bounding boxes
- Text annotation with highlighting support
- Task assignment and progress tracking
- Multiple label types (product, person, vehicle, animal, text, other)
- Annotation history and status tracking
- Responsive task sidebar with search and filtering

#### 2. Sentra QA Dashboard
- Quality review interface for submitted annotations
- Quality score tracking and visualization
- Status management (approved, rejected, needs revision)
- Accuracy trend charts
- Annotator performance metrics
- Sortable review table with search

#### 3. Sentra Workforce Hub
- Team member management and oversight
- Performance metrics per annotator
- Training program progress tracking
- Workforce role distribution visualization
- Active status and task assignment monitoring
- Quality score monitoring for each team member

#### 4. Admin Dashboard
- Platform-wide metrics and KPIs
- Project management interface
- Weekly activity charts
- Quality distribution analysis
- Project progress tracking
- Completion rate monitoring

#### 5. Settings & Profile
- User profile management
- Notification preferences
- Security settings
- Role-based feature access

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React Context API + localStorage

### Project Structure
\`\`\`
├── app/
│   ├── page.tsx                    # Authentication page
│   ├── app/
│   │   ├── layout.tsx              # App layout with sidebar
│   │   ├── annotate/page.tsx       # Annotation workspace
│   │   ├── qa/page.tsx             # QA review dashboard
│   │   ├── workforce/page.tsx      # Workforce management
│   │   ├── dashboard/page.tsx      # Admin dashboard
│   │   └── settings/page.tsx       # User settings
│   ├── globals.css                 # Theme and styles
│   └── layout.tsx                  # Root layout
├── components/
│   ├── layout/                     # Sidebar, header, app layout
│   ├── annotation/                 # Annotation canvas, task sidebar, history
│   ├── qa/                         # QA metrics, review table, charts
│   ├── workforce/                  # Workforce stats, team management
│   ├── dashboard/                  # Project metrics, charts, overview
│   └── ui/                         # shadcn UI components
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   ├── mock-data.ts                # Mock users, tasks, annotations
│   ├── auth-context.tsx            # Authentication provider
│   └── utils.ts                    # Utility functions
└── public/                         # Static assets
\`\`\`

## Demo Accounts

Test different user roles using these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sentra.com | demo |
| Annotator | annotator1@sentra.com | demo |
| QA Reviewer | qa@sentra.com | demo |
| Client | client@sentra.com | demo |

## Key Features

- **Fully Navigable**: Complete UI for all modules with role-based routing
- **Mocked Interactions**: All CRUD operations simulate state updates with loading states
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Feedback**: Toast notifications and loading indicators throughout
- **Data Visualization**: Multiple chart types for metrics and trends
- **Role-Based Access**: Sidebar navigation adapts based on user role

## Getting Started

1. Download or clone the project
2. Install dependencies (if needed): `npm install`
3. Run development server: `npm run dev`
4. Visit `http://localhost:3000`
5. Use any demo account to login
6. Explore the different modules based on your role

## Note

This is a **frontend-only MVP** with all data mocked locally. It serves as a UX/UI validation prototype and is ready for backend integration in Phase 2.

## Next Steps for Production

1. Integrate with real authentication backend
2. Connect to database for persistent storage
3. Implement real-time WebSocket updates
4. Add file upload capabilities for images/documents
5. Integrate payment processing
6. Set up analytics and monitoring
7. Add export and reporting features
