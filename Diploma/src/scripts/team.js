import teamArray from './team.const';

{
    const fullSize = document.querySelector('.team__photo_big');
    const teamPhotoTape = document.querySelector('.team-photo__tape');
    const teamData = document.querySelector('.team-photo__all');
    const personalName = document.querySelector('.personal-information__name');
    const personalDescription = document.querySelector('.personal-information__text');
    const socialWrapper = document.querySelector('.personal-information__social_wrapper');



    let render = ({ target }) => {
        changeFullPhoto(target)
    };

    let changeFullPhoto = (target) => {
        let itemID = target.getAttribute('id');

        teamArray.forEach(elem => {
            if (elem.id === itemID) {
                fullSize.innerHTML = "";

                renderProfile(elem.id);
            }
        })
    };

    let getPersonalData = (id) => {
        for (let i = 0; i < teamArray.length; i++) {
            let currentProfile = teamArray[i];

            if  (currentProfile.id === id) return currentProfile
        }
    };

    let renderProfile = (id, isFirstRender) => {
        const profile = getPersonalData(id);
        let fullPhoto = renderFullImage(profile);
        let socialList = createSocialList(profile);

        socialWrapper.innerHTML= "";
        socialWrapper.appendChild(socialList);
        renderPersonalName(profile);
        renderPersonalDescription(profile);
        fullSize.appendChild(fullPhoto);

        if (isFirstRender) {
            let teamPhoto = createTeamPhoto();
            teamData.appendChild(teamPhoto);
        }
    };

    let renderFullImage = (profile) => {
        let fullPhoto = document.createElement('img');
        fullPhoto.className = 'team__photo_img';
        fullPhoto.setAttribute('src', profile.photo);

        return fullPhoto;
    };

    let renderPersonalName = (profile) => {
        personalName.innerText = profile.name
    };

    let renderPersonalDescription = (profile) => {
        personalDescription.innerText = profile.description;
    };

    let createSocialList = (profile) => {
        let socialData = Object.keys(profile.social);
        let profileSocial = document.createElement('div');
        profileSocial.className = 'personal-information__social';

        socialData.forEach(key => {
            let socialItem = document.createElement('a');
            socialItem.className = 'personal-information__network';
            socialItem.setAttribute('href', profile.social[key]);
            socialItem.setAttribute('target', '_blank');
            socialItem.innerText = key;
            profileSocial.appendChild(socialItem);
        });

        return profileSocial;
    };

    let createTeamPhoto = () => {
        teamArray.forEach(elem => {
            let photoItem = document.createElement('div');
            photoItem.className = 'team-photo__item';

            let nameTitleBox = document.createElement('div');
            nameTitleBox.className = 'team-photo__item_note';

            let nameTitle = document.createElement('p');
            nameTitle.className = 'team-photo__item_name';
            nameTitle.innerText = elem.name;

            let photoImages = document.createElement('img');
            photoImages.className = 'team-photo__img';
            photoImages.setAttribute('src', elem.photo);
            photoImages.setAttribute('id', elem.id);

            photoItem.appendChild(photoImages);
            photoItem.appendChild(nameTitleBox);
            nameTitleBox.appendChild(nameTitle);
            teamPhotoTape.appendChild(photoItem);
        });

        return teamPhotoTape;
    };

    renderProfile(teamArray[0].id, true);
    teamPhotoTape.onclick = render;
}