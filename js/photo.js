"use strict";

const avatarChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const photoChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoSection = document.querySelector(`.ad-form__photo`);


const renderPreview = (fileChooser, previewSection) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.constants.FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewSection.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const onChangeAvatar = () => {
  renderPreview(avatarChooser, avatarPreview);
};

const onChangePhoto = () => {
  if (!photoSection.querySelector(`img`)) {
    const img = document.createElement(`IMG`);
    img.width = `70`;
    img.height = `70`;
    img.alt = `Фотография помещения`;
    photoSection.appendChild(img);
  }

  const photoPreview = document.querySelector(`.ad-form__photo img`);
  renderPreview(photoChooser, photoPreview);
};

window.photo = {
  onChangeAvatar,
  onChangePhoto,
};
