const validation = (driver) => {
  const errors = {};

  if (!driver.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }else if (driver.name.length > 20){
    errors.name = "El nombre no puede ser mayor a 20 letras"
   }
 

  if (!driver.surname.trim()) {
    errors.surname = "El apellido es obligatorio";
  } else if (!/^[a-zA-Z\sÀ-ÖØ-öø-ÿ]+$/.test(driver.surname)) {
    errors.surname = "El nombre no debe contener símbolos ni números";
  }

  if (!driver.nationality.trim()) {
    errors.nationality = "La nacionalidad es obligatoria";
  } else if (!/^[A-Za-z\sÀ-ÖØ-öø-ÿ]+$/.test(driver.nationality)) {
    errors.nationality = "La nacionalidad no debe contener símbolos ni números";
  }

  if (!driver.dob.trim()) {
    errors.dob = "La fecha de nacimiento es obligatoria";
  }

  if (!driver.image.trim()) {
    errors.image = "La imagen es obligatoria";
  }

  if (!driver.description.trim()) {
    errors.description = "La descripción es obligatoria";
  } else {
    const wordCount = driver.description.split(/\s+/).length;
    if (wordCount < 5 || wordCount > 200) {
      errors.description = "La descripción debe tener entre 5 y 200 palabras";
    }
  }

  return errors;
};

export default validation;
