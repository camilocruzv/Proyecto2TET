Para el componente de seguridad se realizaron varios cambios, entre ellos realizamos la autenticación de usuarios, esta cuenta con un doble check de contraseña con el fin de que el usuario evite errores al momento de ingresar su contraseña al registrarse y al acceder. Tambien agregamos la autenticación por medio de redes sociales usando Firebase. 

"Firebase Authentication proporciona servicios de backend, SDK fáciles de usar y bibliotecas de IU ya elaboradas para autenticar a los usuarios en tu app. Admite la autenticación mediante contraseñas, números de teléfono, proveedores de identidad federada populares, como Google, Facebook y Twitter, y mucho más." (https://firebase.google.com/docs/auth/?hl=es-419)

Al momento de registrar un usuario se realiza un cifrado de contraseñas con el fin de que esta permanezca segura. Asegurandole al usuario de esta forma su registro e ingreso a nuestra plataforma.

Ademas de estos desarrollos realizados tambien se implementó el manejo de sesiones. Por medio de tokens se comprueba si la persona que esta utilizando la app realmente ha ingresado, en caso que si, se le permite a esta persona acceder a ciertas paginas. Si no ha ingresado, esta persona no puede tener acceso a algunas paginas.
