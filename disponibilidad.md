Para el componente de disponibilidad se ha desarrollado un balanceador de cargas con Nginx.

Tambien se ha utilizado la herramienta de balanceador de cargas de AWS para el frontend. Esto nos permite tener desplegado el Frontend en dos maquinas, distribuyendo el tráfico de forma apropiada:

"Elastic Load Balancing distribuye automáticamente el tráfico de aplicaciones entrantes a través de varios destinos, tales como instancias de Amazon EC2, contenedores, direcciones IP y funciones Lambda. Puede controlar la carga variable del tráfico de su aplicación en una única zona o en varias zonas de disponibilidad. Elastic Load Balancing ofrece tres tipos de balanceadores de carga que cuentan con el nivel necesario de alta disponibilidad, escalabilidad automática y seguridad para que sus aplicaciones sean tolerantes a errores." (https://aws.amazon.com/es/elasticloadbalancing/)

De igual forma se ha utilizado MongoDB Atlas. MongoDB Atlas ofrece la base de datos líder del mercado para aplicaciones modernas como servicio en la nube totalmente automatizado, con las mejores prácticas operativas y de seguridad integradas. Se incluyen prácticas de seguridad y operativas comprobadas que automatizan las tareas de administración que consumen tiempo, como el aprovisionamiento de la infraestructura, la configuración de la base de datos, la disponibilidad, la distribución global, las copias de seguridad y más.

A continuación se listan algunas de las características de MongoDB Atlas:
![Características de MongoDB Atlas](https://i.imgur.com/MlOQOCf.png)
