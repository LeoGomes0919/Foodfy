const PhotosUpload = {
  uploadLimit: 5,
  preview: document.querySelector('.photos-preview'),
  files: [],
  input: "",
  msg: 'A receita deve conter pelo menos uma imagem.',
  handleFileInput(event) {
    const { files: fileList } = event.target;
    const { preview, files } = PhotosUpload;
    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {

      files.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = String(reader.result);

        const container = PhotosUpload.getContainer(img);

        preview.appendChild(container);
      }

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },

  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.length > uploadLimit) {
      const msgLimit = `Envie no máximo ${uploadLimit} fotos.`;
      PhotosUpload.messageErrorLimit(msgLimit);
      event.preventDefault();
      return true;
    }

    const photosChildren = [];
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == 'photo') {
        photosChildren.push(item);
      }
    });

    const totalPhotos = fileList.length + photosChildren.length;
    if (totalPhotos > uploadLimit) {
      const msgMaxLimit = 'Limite máximo de fotos atingido.';
      PhotosUpload.messageErrorLimit(msgMaxLimit);
      event.preventDefault();
      return true;
    }

    return false;
  },

  getAllFiles() {
    const { files } = PhotosUpload;
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();

    files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
  },

  getContainer(img) {
    const container = document.createElement('div');
    container.classList.add('photo');
    container.onclick = PhotosUpload.removePhoto;

    container.appendChild(img);
    container.appendChild(PhotosUpload.getRemoveButton());
    return container;
  },

  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = 'close';
    button.title = 'Remover foto';

    return button;
  },

  removePhoto(event) {
    const photo = document.querySelectorAll('.photo');
    const { files, msg } = PhotosUpload;

    if (photo.length == 1) {
      PhotosUpload.messageErrorLimit(msg);
    } else {
      const photoContainer = event.target.parentNode;
      const photosArray = Array.from(PhotosUpload.preview.children);
      const index = photosArray.indexOf(photoContainer);

      files.splice(index, 1);
      PhotosUpload.input.files = PhotosUpload.getAllFiles();

      photoContainer.remove(index);
    }
  },

  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;
    const photo = document.querySelectorAll('.photo');
    const { msg } = PhotosUpload;
    if (photo.length == 1) {
      PhotosUpload.messageErrorLimit(msg);
    } else {
      if (photoDiv.id) {
        const removedFiles = document.querySelector('input[name="removed_files"]');
        if (removedFiles) {
          removedFiles.value += `${photoDiv.id},`
        }
      }
      photoDiv.remove();
    }
  },

  messageErrorLimit(msg) {
    const container = document.querySelector('.message-container');
   const messageContainer = document.querySelector('.message');
   messageContainer.innerHTML = msg;
   container.classList.add('error', 'show');
  }
}

const typesValidate = [
  'image/png',
  'image/jpeg',
  'image/jpg'
]

function ValidateImage(file) {
  return typesValidate.includes(file.type);
}

const PreviewAvatarChef = {
  content: document.querySelector('#preview-chef'),
  view: document.createElement('img'),
  message: document.createElement('p'),

  handleFile(input) {
    const { content, view, message } = PreviewAvatarChef;
    const currentFile = input.files;
    if (currentFile.length > 0) {
      for (const file of currentFile) {
        if (ValidateImage(file)) {
          view.src = URL.createObjectURL(file);
          content.appendChild(view);
        } else {
          message.textContent = 'Tipo de arquivo inválido.'
          content.appendChild(message);
        }
      }
    }
  }
}
