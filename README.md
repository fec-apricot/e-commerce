## This project was created by Team Apricot.

|Name  |Component  |Github Handle  |
|---|---|---|
|Xintong Mi  |Overview  |[XintongTheCoder](https://github.com/XintongTheCoder) |
|Tyler O'Neill  |Related Products  |[jtoneill](https://github.com/jtoneill)  |
|Aliyah Indra  |Questions and Answers  |[aliyahindra](https://github.com/aliyahindra)  |
|Noriel Flores  |Reviews  |[nflo78](https://github.com/nflo78)  |

# Description

This is an e-commerce project created with React, Node.js, Express.js, Amazon AWS, Jest, Webpack, and Babel. It is designed to deliver a seamless online shopping experience.

Some of the challenges encountered while building this project include setting up the Amazon AWS infrastructure and ensuring the application is responsive.

# Technologies Used

This project uses the following technologies:

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)](https://jestjs.io/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Amazon AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

# Installation and Running

To install the project, clone the repository and install the dependencies:

        git clone https://github.com/fec-apricot/e-commerce.git
        cd e-commerce
        npm install
        
To run the project:

        npm start

#### If necessary, create a .env file with the following variables:

PORT=3000
TOKEN='github token'

#### Wins and Improvements

This project was successful in creating a user-friendly e-commerce application that is easy to use and provides a great user experience. The Amazon AWS infrastructure was successfully set up and deployed. The application is also responsive.

Some improvements that could be made include adding more features such as a payment gateway, creating more tests, and improving the user experience.

# Widget Notes

## Overview

<a href="https://imgbb.com/"><img src="https://i.ibb.co/V3qBfvP/fec-overview-optimize.gif" alt="fec-overview-optimize" border="0"></a>
#### Features

- General information about the product, including product rating, name, category, price, slogan, description and features
- A list of styles. Users can toggle between styles, the selected style will be displayed in the image gallery
- Size and quantity selector, add to cart button
- Image gallery with a list of thumbnails
- Clicking on the main image will open the expanded view of the current image
- Clicking on the expanded view will toggle zoom in and zoom out of the image

#### OverviewCarousel.jsx
- The OverviewCarousel can be used by both ImageGallery.jsx and ExpandedView.jsx. It will take the following props: 
  - defaultViewIndex is the index of the default view image.
  - setDefaultViewIndex will set the index of the default view image.
  - thumbnailViewIndexStart is the index of the first image in the thumbnail view.
  - setThumbnailIndexStart will set the index of the first image in the thumbnail view.
  - isExpandedView shows whether the current overview carousel is the default view or the expanded view.
  - handleClick is setShowExpandedView in the default view and setShowMagnifier in the expanded view.


## Related Products

#### RelatedProducts.jsx
#### The related products module doesn't require any props

#### Modal.jsx
#### The comparison modal module requires two props to be passed to it. (open, onClose)
- The open prop takes the openModal function which gathers the feature information to display in the comparison modal.

- The onClose prop takes a callback function that contains setModalOpen(false). This sets the boolean which the modal uses to conditionally render.

#### Carousel.jsx
#### The carousel module requires six props to be passed to it. (rpMode, dataStore, related, burn, outfitList, outfitToggle)
- The rpMode prop takes a boolean to determine which mode the carousel will render. Setting rpMode to true puts the carousel into Related Products mode. This mode renders a list of products that are related to the main product. Setting rpMode to false renders the carousel in Outfit List mode. This renders a carousel of empty cards that the user can add products to.
- The dataStore prop passes all the stored product info down to the product cards.
- The related prop is an array of product ids that are related to the main product.
- The burn prop is used to trigger rerenders after certain events.
- The outfitList prop is an array, pulled from local storage if its there, that stores the product ids that users have saved for later.
- The outfitToggle prop is a function that adds and removes products from the outfit list.

#### ProductCard.jsx
#### The comparison modal module requires six props to be passed to it. (relatedID, outfitButton, outfitToggle, burn, rpMode, dataStore)
- The relatedID prop is set to the id number of the product that the card will display.
- The outfitButton prop takes a boolean. Only used to set the first card in the outfit list as a button.
- The outfitToggle, burn, rpMode, and dataStore props are the same as their carousel counterparts (above).


## Questions and Answers

#### Questions.jsx
- The Questions module doesn't require any props

#### QuestionList.jsx
- The QuestionList module requires the {questions} as a prop 
- Then it maps over an array of questions.

#### QuestionListEntry.jsx
- The QuestionListEntry module requires the {answer} as a prop
- Then it keys into to the answer object
- It make a get request to the API to get the list of answers
- It maps answers and passes a answer to the AnswerListEntry module

#### AnswerListEntry.jsx
- The AnswerListEntry module requires the {question} as a prop
- Then it keys into to the question obj
- It make a get request to the API using the answer id to update helpfulness

#### QuestionForm.jsx
- The QuestionForm module requires the {setIsOpen} as a prop passed from Questions as well as the productId and product passed from the Global Context
- It sets state for the form submissions and make a post request to update the API

#### AnswerForm.jsx
- The AnswerForm module requires the {setOpenForm, question, setBurn, burn} as a prop passed from Questions as well as the product passed from the Global Context
- It sets state for the form submissions and make a post request to update the API

#### Search.jsx
- The Search module requires the {setQuestions, setAllQuestions} as a prop
- It sets state and updates the list with the input from the search.


## Reviews

#### Reviews.jsx
  - This file contains all of the children components needed to render the reviews and ratings of a certain         product.
  - It makes a get request to set an initial review list, to set a total review list to be filtered on, and to       get metadata of a specific product. 

#### ReviewList.jsx
  - This file inherits the props for the product ID, sort parameter, review list, total review list, review         modal switch, and a sort switch for filtering. 
  - The review modal prop allows for a review submission modal to be rendered when the “ADD A REVIEW” button is     clicked. The sort switch prop, which invokes the filtering in ReviewBreakdown.jsx, is changed whenever the       sort parameter is changed from the drop down menu.

#### ReviewTile.jsx
  - This file is mapped out from ReviewList.jsx and requires a single review prop to render out the pertinent   information.
  - If there are any photos in the review it will also pass the url and photo modal prop to TilePhoto.jsx.

#### TilePhoto.jsx
  - This file allows for a modal to appear rendering a bigger version of the picture whenever a photo is clicked     on in the ReviewTile.

#### ReviewBreakdown.jsx
  - This file inherits the props for product ID, review list, total reviews, sort parameters, and sort switch.     
  - Filtering occurs whenever a breakdown bar is clicked, the sort switch is changed in ReviewList.jsx. 

#### ProductBreakdown.ksx
  - This file only requires the props product ID and characteristics of the product from metadata.
  - It maps out these characteristics as details for DetailBar.jsx

#### DetailBar.jsx
  - This file requires a detail prop from a single characteristic of that item and displays it as a dynamic bar rating in the Product Breakdown.

#### WriteReview.jsx
  - This file represents the review submission modal that appears whenever the “ADD A REVIEW” button is clicked. 
  - It inherits the props for the product, the review modal switch, and the characteristics from the metadata.
  - It also maps out radio buttons from the characteristic props.

#### WriteButton.jsx
  - This file takes in a single detail and the detail object that is needed to be sent as a GET request in           WriteReview.jsx. 
  - It renders five buttons for a single detail with a scale being different for a specific detail. 

### Stars

#### Stars.jsx
#### The stars module requires four props be passed to it. (ratings, size, interactive, cb)
- The ratings prop should be an object that has keys 1 through 5 representing review star ratings, and each keys value should be a number in a string, representing the number of reviews that gave a 'key' star rating.
The
- The size prop is a number to adjust the size of the stars module.
- The interactive prop is a true or false value which determines which mode the stars module will render in. Pass in false will cause the stars module to render the non-interactive mode which displays the average star rating based on the ratings object. Passing in true renders the star module in an interactive mode which allows the user to click on the stars to set their rating during the review process. The interactive mode also has hover effects that highlight the stars when the cursor hovers over them.
- The cb prop should be a basic callback function that has a useState set function in it. The stars module will trigger this function and update the state whenever a user clicks on the star. The useState will be updated with a number representing the users chosen star rating for the review.
#### example callback: (num) => { setUserRating(num); }

