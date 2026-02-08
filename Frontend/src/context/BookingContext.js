import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext({});

export const BookingProvider = ({ children }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [foodOrders, setFoodOrders] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);

    const selectEvent = (event) => {
        setSelectedEvent(event);
        setSelectedSeats([]);
        setFoodOrders([]);
    };

    const toggleSeatSelection = (seat) => {
        const isSelected = selectedSeats.find((s) => s.id === seat.id);
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const clearSeats = () => {
        setSelectedSeats([]);
    };

    const addFoodOrder = (item, quantity) => {
        const existingOrder = foodOrders.find((o) => o.id === item.id);
        if (existingOrder) {
            setFoodOrders(
                foodOrders.map((o) =>
                    o.id === item.id ? { ...o, quantity: o.quantity + quantity } : o
                )
            );
        } else {
            setFoodOrders([...foodOrders, { ...item, quantity }]);
        }
    };

    const removeFoodOrder = (itemId) => {
        setFoodOrders(foodOrders.filter((o) => o.id !== itemId));
    };

    const updateFoodQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFoodOrder(itemId);
        } else {
            setFoodOrders(
                foodOrders.map((o) => (o.id === itemId ? { ...o, quantity } : o))
            );
        }
    };

    const clearFoodOrders = () => {
        setFoodOrders([]);
    };

    const calculateTotal = () => {
        const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        const foodTotal = foodOrders.reduce(
            (sum, order) => sum + order.price * order.quantity,
            0
        );
        return seatsTotal + foodTotal;
    };

    const confirmBooking = () => {
        const booking = {
            id: Date.now().toString(),
            event: selectedEvent,
            seats: selectedSeats,
            foodOrders: foodOrders,
            total: calculateTotal(),
            bookedAt: new Date().toISOString(),
            status: 'confirmed',
        };
        setBookingHistory([booking, ...bookingHistory]);
        setSelectedEvent(null);
        setSelectedSeats([]);
        setFoodOrders([]);
        return booking;
    };

    const cancelBooking = (bookingId) => {
        setBookingHistory(
            bookingHistory.map((b) =>
                b.id === bookingId ? { ...b, status: 'cancelled' } : b
            )
        );
    };

    return (
        <BookingContext.Provider
            value={{
                selectedEvent,
                selectedSeats,
                foodOrders,
                bookingHistory,
                selectEvent,
                toggleSeatSelection,
                clearSeats,
                addFoodOrder,
                removeFoodOrder,
                updateFoodQuantity,
                clearFoodOrders,
                calculateTotal,
                confirmBooking,
                cancelBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};

export default BookingContext;
