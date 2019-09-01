# ZyntaxBlog

 MedTelPlus Web App Version 0.1.0.

## In development

This blog platform will be integrated with [MedTelPlus](https://medtelplus.com).

## List of Module Dependencies

    1. [NgBootstrap](http://getbootstrap.com)
    2. [AngularFire](http://firebase.com)
    3. [RXJS](https://rxjs-dev.firebaseapp.com)
    4. [Syncfusion](https://ej2.syncfusion.com/angular)
    5. [Ngx Owl Carousel](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o)

Compiled AOT from *.ts* to *.js*

## Features

- Admin Login for domain write, read and update access
- Rich Text Editor for creating and editing content
- Image uploading and storage
- Post filtering by date and tag TODO: filter by author

## Server-Side with Firebase Functions

Thanks to Firebase and AngularFire, we can write Nodejs scripts, then use a firebase trigger to call our server function which fires a callback returning our firestore, database or storage data.

----------

## The TODO List

- Add About page content
- Add feature to create and edit other domain content
- Add save and exit capability
- Refactor Module: Image Upload
- Refactor/Redesign Contact page

----------

## Hopes and Dreams

The end product should be a fully functional, and fully independent blog platform that will easily integrate and scale with MedTelPlus, perhaps on a subdomain.
