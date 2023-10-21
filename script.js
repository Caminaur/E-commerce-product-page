

  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const amount = document.getElementById('amount');
  const addToCartBtn = document.getElementById('addToCart');

  const mainImage = document.getElementById('mainImage');
  const images = document.querySelectorAll('.product-image-mini img');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  plus.addEventListener('click',(e)=>{
    value =  (parseInt(amount.value) + 1);
    amount.setAttribute('value', value);
  });
  
  minus.addEventListener('click',(e)=>{
    value =  (parseInt(amount.value) - 1);
    if (value<0) return;
    amount.setAttribute('value', value);  
  });


  // image selector
  for (const image of images) {
    image.addEventListener('click',()=>{
      url = image.src.replace('-thumbnail','');
      
      resetSelector();
      image.dataset.imageSelected = true;
      if (image.id.includes('b')) {
        imagen1 = document.getElementById(image.id.replace('b',''));
        imagen1.dataset.imageSelected = true;
      } else{
        imagen2 = document.getElementById(image.id.concat('b'));
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

  lightbox.addEventListener('click',(e)=>{
    if(e.target !== e.currentTarget) return;
    lightbox.dataset.status = 'inactive';
  });


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