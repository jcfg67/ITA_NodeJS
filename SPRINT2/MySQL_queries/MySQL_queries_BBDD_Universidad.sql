SELECT apellido1, apellido2, nombre FROM persona WHERE tipo = 'alumno' ORDER BY apellido1, apellido2, nombre;
SELECT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'alumno' AND (telefono IS NULL OR telefono = '');
SELECT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'alumno' AND fecha_nacimiento REGEXP '^1999';
SELECT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'profesor' AND (telefono IS NULL OR telefono = '') AND nif REGEXP 'K$';
SELECT nombre FROM asignatura WHERE cuatrimestre = 1 AND curso = 3 AND id_grado = 7;
SELECT apellido1, apellido2, pe.nombre, d.nombre FROM profesor pr JOIN persona pe ON pr.id_profesor = pe.id JOIN departamento d ON pr.id_departamento = d.id ORDER BY apellido1, apellido2, pe.nombre;
SELECT a.nombre, anyo_inicio, anyo_fin FROM asignatura a JOIN alumno_se_matricula_asignatura al ON a.id = al.id_asignatura JOIN curso_escolar cu ON al.id_curso_escolar = cu.id JOIN persona pe ON al.id_alumno = pe.id WHERE pe.nif = '26902806M';
SELECT DISTINCT d.nombre FROM departamento d JOIN profesor pr ON d.id = pr.id_departamento JOIN asignatura a ON pr.id_profesor = a.id_profesor JOIN grado g ON a.id_grado = g.id WHERE g.nombre = 'Grado en Ingeniería Informática (Plan 2015)';
SELECT DISTINCT apellido1, apellido2, pe.nombre FROM persona pe JOIN alumno_se_matricula_asignatura al ON pe.id = al.id_alumno JOIN curso_escolar cu ON al.id_curso_escolar = cu.id WHERE al.id_asignatura IS NOT NULL AND cu.anyo_inicio = 2018;
SELECT d.nombre, pe.apellido1, pe.apellido2, pe.nombre FROM departamento d LEFT JOIN profesor pr ON d.id = pr.id_departamento JOIN persona pe ON pe.id = pr.id_profesor ORDER BY d.nombre, pe.apellido1, pe.apellido2, pe.nombre;
SELECT pe.apellido1, pe.apellido2, pe.nombre FROM persona pe JOIN profesor pr ON pe.id = pr.id_profesor WHERE id_departamento IS NULL;
SELECT d.nombre FROM departamento d LEFT JOIN profesor pr ON d.id = pr.id_departamento WHERE pr.id_profesor IS NULL;
SELECT pe.nombre, pe.apellido1, pe.apellido2 FROM persona pe JOIN profesor pr ON pe.id = pr.id_profesor LEFT JOIN asignatura a ON pr.id_profesor = a.id_profesor WHERE a.id_profesor IS NULL;
SELECT nombre FROM asignatura WHERE id_profesor IS NULL;
SELECT DISTINCT d.nombre FROM departamento d LEFT JOIN profesor pr ON d.id = pr.id_departamento LEFT JOIN asignatura a ON a.id_profesor = pr.id_profesor WHERE a.id_profesor IS NULL;
SELECT COUNT(id) FROM persona WHERE tipo = 'alumno';
SELECT COUNT(id) FROM persona WHERE tipo = 'alumno' AND fecha_nacimiento REGEXP '^1999';
SELECT d.nombre, COUNT(pr.id_profesor) AS numero_profesores FROM departamento d JOIN profesor pr ON d.id = pr.id_departamento GROUP BY d.nombre ORDER BY numero_profesores DESC;
SELECT d.nombre, COUNT(pr.id_profesor) FROM departamento d LEFT JOIN profesor pr ON d.id = pr.id_departamento GROUP BY d.nombre;
SELECT g.nombre, COUNT(a.id_grado) AS numero_asignaturas FROM grado g LEFT JOIN asignatura a ON g.id = a.id_grado GROUP BY g.nombre ORDER BY numero_asignaturas DESC;
SELECT g.nombre, COUNT(a.id_grado) AS numero_asignaturas FROM grado g LEFT JOIN asignatura a ON g.id = a.id_grado GROUP BY g.nombre HAVING numero_asignaturas > 40;
SELECT g.nombre, a.tipo, SUM(a.creditos) FROM grado g JOIN asignatura a ON g.id = a.id_grado GROUP BY g.nombre, a.tipo;
SELECT cu.anyo_inicio, COUNT(al.id_alumno) FROM curso_escolar cu JOIN alumno_se_matricula_asignatura al ON cu.id = al.id_curso_escolar GROUP BY cu.anyo_inicio;
SELECT pr.id_profesor, pe.nombre, pe.apellido1, pe.apellido2, COUNT(a.id) AS numero_asignaturas FROM profesor pr JOIN persona pe ON pr.id_profesor = pe.id LEFT JOIN asignatura a ON pr.id_profesor = a.id_profesor GROUP BY pr.id_profesor, pe.nombre, pe.apellido1, pe.apellido2 ORDER BY numero_asignaturas DESC
SELECT * FROM persona WHERE tipo = 'alumno' ORDER BY fecha_nacimiento DESC LIMIT 1
SELECT pe.apellido1, pe.apellido2, pe.nombre FROM persona pe JOIN profesor pr ON pe.id = pr.id_profesor WHERE id_departamento IS NULL;

