import pictureCatalog from './product.const';

{
    let allButton = document.querySelector('[tag=all]');
    let printButton = document.querySelector('[tag=print]');
    let webButton = document.querySelector('[tag=web]');
    let userButton = document.querySelector('[tag=user]');
    let mockUpButton = document.querySelector('[tag=mockUp]');
    let imageBox = document.querySelector('.product__images');

    let clearHTML = () => {
        imageBox.innerHTML = "";
    };

    let getImagesDOM = (imagesArray)=> {
        let content = document.createElement('div');
        content.className = 'product-images__box';

        imagesArray.forEach(element => {
            let picture = document.createElement('div');
            picture.classList.add('product-images__item');

            let pictureImage = document.createElement('img');
            pictureImage.className = 'product-images__item_img';
            pictureImage.setAttribute('src', element.img);

            picture.appendChild(pictureImage);
            content.appendChild(picture);
        });

        imageBox.appendChild(content);
    };


    let rerender = (event, renderAll) => {
        const tag = renderAll ? 'all' : event.target.getAttribute('tag');
        clearHTML();
        const imagesArray = tag === 'all' ? pictureCatalog : getFilteredImages(tag);
        const imagesHTML = getImagesDOM(imagesArray);

    };

    let sortForAll = ()=> {
        clearHTML();
    };

    let getFilteredImages = (tag)=> {
        let filteredImages = [];
        pictureCatalog.forEach((element) => {
            if (element.tags.includes(tag)) filteredImages.push(element);
        });

        return filteredImages;
    };

    rerender(null, true);

    allButton.onclick = rerender;
    printButton.onclick = rerender;
    webButton.onclick = rerender;
    userButton.onclick = rerender;
    mockUpButton.onclick = rerender;
}