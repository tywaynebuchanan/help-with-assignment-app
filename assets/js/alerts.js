
//Function to remove the alert
export const hideAlert = () =>{
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
}

//type is either success or fail
export const showAlert = (type,message)=>{
    hideAlert()
    const markup = `
    <div class="mx-auto" style="width: 400px;">
        <div class="alert alert-${type} m-2" role="alert" >
            ${message}
        </div>
    </div>
   `
  document.querySelector('body').insertAdjacentHTML('afterbegin',markup);
  window.setTimeout(hideAlert,5000);

}