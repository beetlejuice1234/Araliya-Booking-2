document.addEventListener('DOMContentLoaded', function () {
    let currentBooking = {
        roomType: "",
        numRooms: 0,
        adults: 0,
        children: 0,
        duration: 0,
        wifi: false,
        view: "none",
        promoCode: "",
        loyaltyPoints: 0,
        adventureType: "",
        guide: false
    };

    let overallBooking = {
        totalCost: 0,
        adventureTotalCost: 0
    };

    function updateTotalCost() {
        document.getElementById('totalCost').textContent = `LKR ${overallBooking.totalCost.toFixed(2)}`;
    }

    function updateAdventureTotalCost() {
        document.getElementById('adventureTotalCost').textContent = `LKR ${overallBooking.adventureTotalCost.toFixed(2)}`;
    }

    function updateLoyaltyPoints() {
        document.getElementById('loyaltyPoints').textContent = currentBooking.loyaltyPoints;
    }

    function resetCurrentBooking() {
        currentBooking = {
            roomType: "",
            numRooms: 0,
            adults: 0,
            children: 0,
            duration: 0,
            wifi: false,
            view: "none",
            promoCode: "",
            loyaltyPoints: 0,
            adventureType: "",
            guide: false
        };
    }

    document.getElementById('hotelBookingForm').addEventListener('submit', function (event) {
        event.preventDefault();

        
        currentBooking.roomType = document.getElementById('roomType').value;
        currentBooking.numRooms = parseInt(document.getElementById('numRooms').value, 10);
        currentBooking.adults = parseInt(document.getElementById('adults').value, 10);
        currentBooking.children = parseInt(document.getElementById('children').value, 10);
        currentBooking.duration = parseInt(document.getElementById('duration').value, 10);
        currentBooking.wifi = document.getElementById('wifi').checked;
        currentBooking.view = document.getElementById('view').value;
        currentBooking.promoCode = document.getElementById('promoCode').value;

        // Calculate cost 
        let cost = calculateHotelCost(currentBooking);

        // Update overall booking cost
        overallBooking.totalCost += cost;

        //loyalty points
        if (currentBooking.numRooms > 3) {
            currentBooking.loyaltyPoints += 20 * currentBooking.numRooms;
        }

        // pdated information
        updateTotalCost();
        updateLoyaltyPoints();

        // Rest current booking details
        resetCurrentBooking();
    });

    document.getElementById('adventureBookingForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // booking details on adventure form inputs
        currentBooking.adventureType = document.getElementById('adventureType').value;
        currentBooking.guide = document.getElementById('guide').checked;

        
        let adventureCost = calculateAdventureCost(currentBooking);

        //adventure booking cost
        overallBooking.adventureTotalCost += adventureCost;

        // confirmation message
        alert(`Thank you for booking the adventure!`);

        // Reset booking details
        resetCurrentBooking();

        // Displaying information
        updateAdventureTotalCost();
        updateLoyaltyPoints();
    });
       //favorites
    function addToFavorites() {
        const favoriteBooking = {
            totalCost: overallBooking.totalCost,
            loyaltyPoints: currentBooking.loyaltyPoints,
            adventureTotalCost: overallBooking.adventureTotalCost,
            adventureType: currentBooking.adventureType,
            guide: currentBooking.guide,
            
        };

        localStorage.setItem('Favorites', JSON.stringify(favoriteBooking));
        alert('Booking added to favorites!');
    }

    function checkLoyalty() {
        alert(`You have earned ${currentBooking.loyaltyPoints} loyalty points!`);
    }

    

    function calculateHotelCost(booking) {
        
        return 25000 * booking.numRooms + 5000 * booking.children + 8000 * booking.numRooms;
    }

    function calculateAdventureCost(booking) {
       
        let adventureCost = 0;

        switch (booking.adventureType) {
            case 'localAdult':
                adventureCost = 5000;
                break;
            case 'localKids':
                adventureCost = 2000;
                break;
            case 'foreignAdult':
                adventureCost = 10000;
                break;
            case 'foreignKids':
                adventureCost = 5000;
                break;
            default:
                break;
        }

        // guide
        if (booking.guide) {
            adventureCost += booking.adventureType.startsWith('local') ? 1000 : 500;
        }

        return adventureCost;
    }

    //table 

    function updateTotalCost() {
        
        overallBooking.totalCost = calculateHotelCost(currentBooking) + overallBooking.adventureTotalCost;
    
        const totalCostElement = document.getElementById('totalCost');
        totalCostElement.textContent = `LKR ${overallBooking.totalCost.toFixed(2)}`;
    
        const totalCostCell = document.getElementById('totalCostCell');
        totalCostCell.textContent = `LKR ${overallBooking.totalCost.toFixed(2)}`;
    }
    
    
    
    function updateAdventureTotalCost() {
        const adventureTotalCostElement = document.getElementById('adventureTotalCost');
        adventureTotalCostElement.textContent = `LKR ${overallBooking.adventureTotalCost.toFixed(2)}`;
    
        const adventureCostCell = document.getElementById('adventureCostCell');
        adventureCostCell.textContent = `LKR ${overallBooking.adventureTotalCost.toFixed(2)}`;
    }
    
    function updateLoyaltyPoints() {
        const loyaltyPointsElement = document.getElementById('loyaltyPoints');
        loyaltyPointsElement.textContent = currentBooking.loyaltyPoints;
    
        const loyaltyPointsCell = document.getElementById('loyaltyPointsCell');
        loyaltyPointsCell.textContent = currentBooking.loyaltyPoints;
    }
    
});
