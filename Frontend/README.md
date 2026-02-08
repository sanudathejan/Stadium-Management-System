# Stadium Seat Booking and Management System - Frontend

A React Native mobile application for stadium seat booking and management, allowing users to reserve seats for events, track availability, and manage stadium operations.

## 🚀 Features

### User Features
- **User Registration & Login**: Secure authentication with email/password
- **Event Browsing**: View scheduled events with category filtering
- **Seat Selection**: Interactive visual seat map with multiple categories (VIP, Ringside, Normal, End Stands)
- **Real-time Availability**: Live seat status updates
- **Food Pre-ordering**: Order food and beverages during booking
- **Booking History**: View upcoming, past, and cancelled bookings
- **Profile Management**: Update personal information and preferences

### Admin Features
- **Dashboard**: Overview of bookings, revenue, and statistics
- **Event Management**: Create, edit, and delete events
- **Seat Configuration**: Manage seat maps and pricing
- **Reports**: View booking statistics and generate reports

## 🛠️ Tech Stack

- **React Native** (Expo) - Cross-platform mobile development
- **React Navigation** - Navigation and routing
- **Expo Linear Gradient** - Gradient backgrounds
- **Async Storage** - Local data persistence
- **Context API** - State management

## 📁 Project Structure

```
Frontend/
├── App.js                    # Main entry point
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── EventCard.js
│   │   ├── Seat.js
│   │   ├── FoodCard.js
│   │   ├── BookingCard.js
│   │   └── Header.js
│   ├── constants/            # App constants
│   │   ├── colors.js         # Color palette
│   │   └── fonts.js          # Typography & spacing
│   ├── context/              # State management
│   │   ├── AuthContext.js    # Authentication state
│   │   └── BookingContext.js # Booking state
│   ├── navigation/           # Navigation configuration
│   │   └── AppNavigator.js
│   └── screens/              # Screen components
│       ├── auth/             # Authentication screens
│       │   ├── WelcomeScreen.js
│       │   ├── LoginScreen.js
│       │   └── RegisterScreen.js
│       ├── main/             # Main app screens
│       │   ├── HomeScreen.js
│       │   ├── EventDetailsScreen.js
│       │   ├── SeatSelectionScreen.js
│       │   ├── FoodOrderScreen.js
│       │   ├── BookingConfirmationScreen.js
│       │   ├── BookingSuccessScreen.js
│       │   ├── BookingsScreen.js
│       │   └── ProfileScreen.js
│       └── admin/            # Admin screens
│           ├── AdminDashboardScreen.js
│           └── ManageEventsScreen.js
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for mobile testing)

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on different platforms:
```bash
# For web
npm run web

# For Android
npm run android

# For iOS
npm run ios
```

## 📱 Screenshots

The app features:
- Modern dark theme with gradient accents
- Smooth animations and transitions
- Interactive seat selection map
- Category-based event filtering
- Comprehensive booking flow

## 🎨 Design System

### Color Palette
- **Primary**: #6366F1 (Indigo)
- **Secondary**: #10B981 (Emerald)
- **Accent**: #F59E0B (Amber)
- **Background**: #0F172A (Dark Blue)

### Seat Categories
- **VIP**: Premium view with exclusive access
- **Ringside**: Close to the action
- **Normal**: Standard stadium view
- **End Stands**: Budget-friendly option

## 🔗 Backend Integration

The frontend is designed to connect to a Java Spring Boot backend. Replace the mock data and API calls in the context files to integrate with your backend:

- `AuthContext.js` - Replace mock login/register with actual API calls
- `BookingContext.js` - Connect to booking API endpoints

## 📄 License

This project is part of a CS undergraduate project management system.

## 👥 Contributors

- Stadium Management System Development Team
