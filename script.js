

  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const amount = document.getElementById('amount');
  const addToCartBtn = document.getElementById('addToCart');

  const mainImage = document.getElementById('mainImage');
  const images = document.querySelectorAll('.product-image-mini img');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const prevLightbox = document.getElementById('prev-lightbox');
  const prev = document.getElementById('prev');
  const nextLightbox = document.getElementById('next-lightbox');
  const next = document.getElementById('next');
  const closeBtn = document.getElementById('lightbox-close');

  const menuMobile = document.querySelector('.mobile-menu');
  const menuBtn = document.getElementById('menu-btn');
  const menuClose = document.getElementById('menu-close');

  const cart = document.getElementById('cart');
  const cartDiv = document.querySelector('.cart');
  const addToCart = document.getElementById('addToCart');

  // .cart-logo::after
  const cartLogo = document.getElementById('cart-logo');
  const cartLogoAfter = window.getComputedStyle(cartLogo,'::after');
  
  cart.addEventListener('click',()=>{
    cartDiv.dataset.dropdown = cartDiv.dataset.dropdown==='active' ? 'inactive' : 'active';
  });


  plus.addEventListener('click',(e)=>{
    value =  (parseInt(amount.value) + 1);
    amount.value = value;
  });
  
  minus.addEventListener('click',(e)=>{
    value =  (parseInt(amount.value) - 1);
    if (value<0) return;  
    amount.value = value;
  });


  // image selector
  for (const image of images) {
    image.addEventListener('click',()=>{
      url = image.src.replace('-thumbnail','');
      
      resetSelector();
      image.dataset.imageSelected = true;
      if (image.id.includes('b')) {
        let imagen1 = document.getElementById(image.id.replace('b',''));
        imagen1.dataset.imageSelected = true;
      } else{
        let imagen2 = document.getElementById(image.id.concat('b'));
        imagen2.dataset.imageSelected = true;
      }
      
      mainImage.setAttribute('src',url);
      lightboxImg.setAttribute('src',url);
    });
  }
  
  function resetSelector(){
    for (const image of images) {
      image.dataset.imageSelected = false;
    }
  }
  // image selector

  mainImage.addEventListener('click',()=>{
    lightbox.dataset.status = 'active';
    lightboxImg.src = mainImage.src;
  });

  closeBtn.addEventListener('click',(e)=>{
    if(e.target !== e.currentTarget) return;
    lightbox.dataset.status = 'inactive';
  });

  document.body.addEventListener('click',(e)=>{
    if(e.target !== e.currentTarget) return;
    cartDiv.dataset.dataDropdown  = 'inactive';
  });

  lightbox.addEventListener('click',(e)=>{
    if(e.target !== e.currentTarget) return;
    lightbox.dataset.status = 'inactive';
  });


  prevLightbox.addEventListener('click', previousImage);
  nextLightbox.addEventListener('click', nextImage);
  prev.addEventListener('click', previousImage);
  next.addEventListener('click', nextImage);

  document.onkeydown = (e) =>{
    if (lightbox.dataset.status!=='active')return;
    if(e.key==="ArrowRight"){
      nextImage();
    }
    if(e.key==="ArrowLeft"){
      previousImage();
    }
  };

  menuClose.addEventListener('click',()=>{
    menuMobile.dataset.active = 'false'; 
  });
  
  menuBtn.addEventListener('click',()=>{
    menuMobile.dataset.active = true; 
  });



  function previousImage(){
    currentImages = document.querySelectorAll('[data-image-selected=true]');
    for (const image of currentImages) {
      image.dataset.imageSelected = false;
      newImage = '';
      if (image.id.includes('b')) {
        newId = image.id.replace('b','');
        newId = parseInt(newId) - 1;
        newImage = newImage.concat('b');
      } else{
        newId = parseInt(image.id) - 1;
      }
      if (newId === 0) {
        newId = 4;
      }
      newId = newId.toString().concat(newImage);
      newImage = document.getElementById(newId);
      url = newImage.src.replace('-thumbnail','');
      lightboxImg.setAttribute('src',url);
      mainImage.setAttribute('src',url);
      newImage.dataset.imageSelected = true;
    }
  }

  function nextImage(){
    currentImages = document.querySelectorAll('[data-image-selected=true]');
    for (const image of currentImages) {
      image.dataset.imageSelected = false;
      newImage = '';
      if (image.id.includes('b')) {
        newId = image.id.replace('b','');
        newId = parseInt(newId) + 1;
        newImage = newImage.concat('b');
      } else{
        newId = parseInt(image.id) + 1;
      }
      if (newId > (images.length/2)) {
        newId = 1;
      }
      newId = newId.toString().concat(newImage);
      newImage = document.getElementById(newId);
      url = newImage.src.replace('-thumbnail','');
      lightboxImg.setAttribute('src',url);
      mainImage.setAttribute('src',url);
      newImage.dataset.imageSelected = true;
    }
  }

  addToCart.addEventListener('click',()=>{
    let amountProduct = amount.value;
    if(amountProduct<=0) return;
    
    let cartContent = document.querySelector('.cart .content');
    
    cartContent.innerHTML = '';

    let cartCounter = document.querySelector('.cart-counter');
    
    let title = document.querySelector('.product-description .title').innerHTML;
    let price = parseInt(document.querySelector('.product-description .price-with-discount').innerHTML.replace('$',''));
    let priceFormatted = `$${price}.00 X ${amountProduct}`;
    let totalPrice = `$${(price * parseInt(amountProduct))}.00`;
    let imageSrc = document.getElementById('mainImage').src;
    
    document.getElementById('checkout').parentElement.style.display = 'block';
    
    cartProduct = document.createElement('div');
    cartProduct.classList.add('cart-product');
    miniImage = document.createElement('img');
    miniImage.setAttribute('src',imageSrc);
    cartProduct.appendChild(miniImage);
    
    cartProductContent = document.createElement('div');
    cartProductContent.classList.add('cart-product-content');
    cartProduct.appendChild(cartProductContent);
    
    productTitle = document.createElement('p');
    productTitle.classList.add('product-title');
    productTitle.innerHTML = title;

    cartProductContent.appendChild(productTitle);
    
    row = document.createElement('div');
    row.classList.add('row');
    cartProductContent.appendChild(row);
    
    priceIndividual = document.createElement('p');
    priceIndividual.classList.add('price-individual');
    priceIndividual.innerHTML = priceFormatted;
    priceTotal = document.createElement('p');
    priceTotal.classList.add('price-total');
    priceTotal.innerHTML = totalPrice;
    
    row.appendChild(priceIndividual);
    row.appendChild(priceTotal);
    
    deleteBtn = document.createElement('img');
    deleteBtn.setAttribute('src','images/icon-delete.svg');
    
    cartProduct.appendChild(deleteBtn);
    cartContent.appendChild(cartProduct);

    cartLogo.style.setProperty('--display','block');
    cartCounter.innerHTML = amountProduct;
    
    deleteBtn.addEventListener('click',()=>{
      cartContent.innerHTML ='';
      document.getElementById('checkout').parentElement.style.display='none';
      pempty = document.createElement('p');
      pempty.classList.add('empty-cart-message');
      pempty.innerHTML = 'Your cart is empty';
      cartLogo.style.setProperty('--display','none');
      cartCounter.innerHTML = amountProduct;
      cartContent.appendChild(pempty);
    });

  });