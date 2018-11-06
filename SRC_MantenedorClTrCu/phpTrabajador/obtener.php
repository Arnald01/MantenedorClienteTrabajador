<?php
   header("Access-Control-Allow-Origin: *");
   header('Content-Type: application/json');
   require_once "db.php";


  $sql = "SELECT t.nombre , t.apellido , t.rut_trabajador ,t.fono, t.descripcion_propia , c.correo , c.contrasena , c.tipo_cuenta ,c.fecha_creacion FROM TRABAJADOR t , CUENTA c WHERE  c.correo = t.correo AND (c.tipo_cuenta='E' or c.tipo_cuenta='R')";

   $resultado = select($sql);
   echo json_encode($resultado);
 ?>


