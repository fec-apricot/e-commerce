# This project was created by Team Apricot.

#### -Overview - Xintong Mi

#### -Related Products - Tyler O'Neill

#### -Questions and Answers - Aliyah Indra

#### -Reviews - Noriel Flores

## -Description

This is an e-commerce project created with React, Node.js, Express.js, Amazon AWS, Jest, Webpack and Babel. It is designed to allow users to purchase items through an online store. The goal was to create an application that is user-friendly and secure.

This project can be used for any type of e-commerce store. It is easy to use and provides a great user experience.

Some of the challenges encountered while building this project include setting up the Amazon AWS infrastructure and ensuring the application is responsive.

## -Technologies Used

This project uses the following technologies:

#### React
#### Amazon AWS
#### Express.js
#### Jest
#### Node.js
#### Webpack
#### Babel

## -Installation and Running

To install the project, clone the repository and install the dependencies:

git clone https://github.com/fec-apricot/e-commerce.git
cd e-commerce
npm install
To run the project:

npm start

## -If necessary, create a .env file with the following variables:

PORT=3000
TOKEN='github token'

## -Wins and Improvements

This project was successful in creating a user friendly e-commerce application that is easy to use and provides a great user experience. The Amazon AWS infrastructure was successfully set up and deployed. The application is also responsive.

Some improvements that could be made include adding more features such as a payment gateway, creating more tests, and improving the user experience.

## -Widget Notes

### -Overview

#### OverviewContext.jsx
- The OverviewContextProvider will take the productID from GlobalContext and provide the children components with selectedStyle, setSelectedStyle and styles, which is an array of all the styles of current product.

#### OverviewCarousel.jsx
- The OverviewCarousel can be used by both ImageGallery.jsx and ExpandedView.jsx. It will take following props: 
  - defaultViewIndex is the index of the default view image.
  - setDefaultViewIndex will set the index of the default view image.
  - thumbnailViewIndexStart is the index of the first image in the thumbnail view.
  - setThumbnailIndexStart will set the index of the first image in the thumbnail view.
  - isExpandedView shows whether current overview carousel is the default view or the expanded view.
  - handleClick is setShowExpandedView in default view and setShowMagnifier in expanded view.


### -Related Products

#### RelatedProducts.jsx
#### The related products module doesn't require any props

#### Modal.jsx
#### The comparison modal module requires two props to be passed to it. (open, onClose)
-The open prop takes the openModal function which gathers the feature information to display in the comparison modal.

-The onClose prop takes a callback function that contains setModalOpen(false). This sets the boolean which the modal uses to conditionally render.

#### Carousel.jsx
#### The carousel module requires six props to be passed to it. (rpMode, dataStore, related, burn, outfitList, outfitToggle)
-The rpMode prop takes a boolean to determine which mode the carousel will render. Setting rpMode to true puts the carousel into Related Products mode. This mode renders a list of products that are related to the main product. Setting rpMode to false renders the carousel in Outfit List mode. This renders a carousel of empty cards that the user can add products to.

-The dataStore prop passes all the stored product info down to the product cards.

-The related prop is an array of product ids that are related to the main product.

-The burn prop is used to trigger rerenders after certain events.

-The outfitList prop is an array, pulled from local storage if its there, that stores the product ids that users have saved for later.

-The outfitToggle prop is a function that adds and removes products from the outfit list.

#### ProductCard.jsx
#### The comparison modal module requires six props to be passed to it. (relatedID, outfitButton, outfitToggle, burn, rpMode, dataStore)
-The relatedID prop is set to the id number of the product that the card will display.

-The outfitButton prop takes a boolean. Only used to set the first card in the outfit list as a button.

-the outfitToggle, burn, rpMode, and dataStore props are the same as their carousel counterparts (above).


### -Questions and Answers

### -Reviews

### -Stars

#### Stars.jsx
#### The stars module requires four props be passed to it. (ratings, size, interactive, cb)
-The ratings prop should be an object that has keys 1 through 5 representing review star ratings, and each keys value should be a number in a string, representing the number of reviews that gave a 'key' star rating.
The

-The size prop is a number to adjust the size of the stars module.

-The interactive prop is a true or false value which determines which mode the stars module will render in. Pass in false will cause the stars module to render the non-interactive mode which displays the average star rating based on the ratings object. Passing in true renders the star module in an interactive mode which allows the user to click on the stars to set their rating during the review process. The interactive mode also has hover effects that highlight the stars when the cursor hovers over them.

-The cb prop should be a basic callback function that has a useState set function in it. The stars module will trigger this function and update the state whenever a user clicks on the star. The useState will be updated with a number representing the users chosen star rating for the review.
#### example callback: (num) => { setUserRating(num); }

