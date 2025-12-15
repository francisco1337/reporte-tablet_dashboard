"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts';
import { 
  LayoutDashboard, Users, Star, TrendingUp, Calendar, MessageSquare, 
  FileText, ArrowUpRight, ArrowDownRight, Filter, ChevronUp, ChevronDown, Search, Eye, EyeOff, RotateCcw,
  BadgeCheck, Menu, X
} from 'lucide-react';

// --- DATOS DE MUESTRA (Estructura estricta solicitada) ---
const RAW_DATA = [
	{
		"ID_CALIFICACION" : 8,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Excelente servicio",
		"FECHA_REGISTRO" : "19.08.2025 13:18"
	},
	{
		"ID_CALIFICACION" : 9,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio",
		"FECHA_REGISTRO" : "19.08.2025 13:56"
	},
	{
		"ID_CALIFICACION" : 10,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "kskjdskjdsf",
		"FECHA_REGISTRO" : "19.08.2025 14:30"
	},
	{
		"ID_CALIFICACION" : 11,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy bueno ",
		"FECHA_REGISTRO" : "20.08.2025 09:25"
	},
	{
		"ID_CALIFICACION" : 12,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "buena",
		"FECHA_REGISTRO" : "20.08.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 13,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "cvcxvcxcx",
		"FECHA_REGISTRO" : "20.08.2025 10:57"
	},
	{
		"ID_CALIFICACION" : 14,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "dfdsaf",
		"FECHA_REGISTRO" : "20.08.2025 12:03"
	},
	{
		"ID_CALIFICACION" : 15,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "dsfas",
		"FECHA_REGISTRO" : "20.08.2025 12:35"
	},
	{
		"ID_CALIFICACION" : 16,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Yut",
		"FECHA_REGISTRO" : "20.08.2025 13:36"
	},
	{
		"ID_CALIFICACION" : 17,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "hola",
		"FECHA_REGISTRO" : "20.08.2025 14:45"
	},
	{
		"ID_CALIFICACION" : 18,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Yhjj",
		"FECHA_REGISTRO" : "21.08.2025 08:07"
	},
	{
		"ID_CALIFICACION" : 19,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Fdf",
		"FECHA_REGISTRO" : "21.08.2025 09:56"
	},
	{
		"ID_CALIFICACION" : 20,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Wsd",
		"FECHA_REGISTRO" : "21.08.2025 14:02"
	},
	{
		"ID_CALIFICACION" : 21,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "excelente",
		"FECHA_REGISTRO" : "22.08.2025 13:43"
	},
	{
		"ID_CALIFICACION" : 32,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Jjnmnj",
		"FECHA_REGISTRO" : "17.09.2025 12:19"
	},
	{
		"ID_CALIFICACION" : 37,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "1337",
		"FECHA_REGISTRO" : "23.09.2025 08:58"
	},
	{
		"ID_CALIFICACION" : 38,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : ".",
		"FECHA_REGISTRO" : "14.10.2025 10:19"
	},
	{
		"ID_CALIFICACION" : 43,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Una excelente atención de todas las personas ",
		"FECHA_REGISTRO" : "14.10.2025 11:31"
	},
	{
		"ID_CALIFICACION" : 44,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Um excelente servicio  y  muy buena atención ",
		"FECHA_REGISTRO" : "14.10.2025 11:42"
	},
	{
		"ID_CALIFICACION" : 47,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio ",
		"FECHA_REGISTRO" : "15.10.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 62,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Hizo lo necesario ",
		"FECHA_REGISTRO" : "20.10.2025 09:26"
	},
	{
		"ID_CALIFICACION" : 63,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que esta guapa",
		"FECHA_REGISTRO" : "20.10.2025 09:43"
	},
	{
		"ID_CALIFICACION" : 69,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Atendió muy rápido ",
		"FECHA_REGISTRO" : "21.10.2025 10:35"
	},
	{
		"ID_CALIFICACION" : 91,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que sigan teniendo su buen servicio ",
		"FECHA_REGISTRO" : "21.10.2025 11:21"
	},
	{
		"ID_CALIFICACION" : 105,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy amables, muy atentos ",
		"FECHA_REGISTRO" : "21.10.2025 12:27"
	},
	{
		"ID_CALIFICACION" : 107,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que le prestaran un poco más ",
		"FECHA_REGISTRO" : "21.10.2025 12:35"
	},
	{
		"ID_CALIFICACION" : 118,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien",
		"FECHA_REGISTRO" : "22.10.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 119,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien",
		"FECHA_REGISTRO" : "22.10.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 142,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que le den solución a su problema ",
		"FECHA_REGISTRO" : "22.10.2025 12:07"
	},
	{
		"ID_CALIFICACION" : 172,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "23.10.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 199,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo muy bien ",
		"FECHA_REGISTRO" : "24.10.2025 09:21"
	},
	{
		"ID_CALIFICACION" : 224,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien. ",
		"FECHA_REGISTRO" : "24.10.2025 10:35"
	},
	{
		"ID_CALIFICACION" : 233,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Excelente servicio",
		"FECHA_REGISTRO" : "24.10.2025 10:53"
	},
	{
		"ID_CALIFICACION" : 241,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "No pidan anticipo para los créditos de un vehículo y una vivienda",
		"FECHA_REGISTRO" : "24.10.2025 11:33"
	},
	{
		"ID_CALIFICACION" : 262,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "A los pensionados no les dan lo qué piden ",
		"FECHA_REGISTRO" : "28.10.2025 09:47"
	},
	{
		"ID_CALIFICACION" : 263,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Prestan muy poquito ",
		"FECHA_REGISTRO" : "28.10.2025 11:26"
	},
	{
		"ID_CALIFICACION" : 287,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien con el servicio ",
		"FECHA_REGISTRO" : "29.10.2025 10:46"
	},
	{
		"ID_CALIFICACION" : 293,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "No tiene dinero para prestar ",
		"FECHA_REGISTRO" : "29.10.2025 11:30"
	},
	{
		"ID_CALIFICACION" : 304,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 12:31"
	},
	{
		"ID_CALIFICACION" : 310,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 09:24"
	},
	{
		"ID_CALIFICACION" : 313,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que funcione el toma turno",
		"FECHA_REGISTRO" : "30.10.2025 09:33"
	},
	{
		"ID_CALIFICACION" : 317,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "A los pensionados no les dan interés ",
		"FECHA_REGISTRO" : "30.10.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 319,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "30.10.2025 09:43"
	},
	{
		"ID_CALIFICACION" : 320,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los intereses muy altos",
		"FECHA_REGISTRO" : "30.10.2025 09:43"
	},
	{
		"ID_CALIFICACION" : 358,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los intereses muy altos!!",
		"FECHA_REGISTRO" : "30.10.2025 11:24"
	},
	{
		"ID_CALIFICACION" : 370,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 12:25"
	},
	{
		"ID_CALIFICACION" : 373,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 377,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos para los pensionados ",
		"FECHA_REGISTRO" : "31.10.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 381,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 10:54"
	},
	{
		"ID_CALIFICACION" : 384,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses lo cobran antes ",
		"FECHA_REGISTRO" : "31.10.2025 11:51"
	},
	{
		"ID_CALIFICACION" : 396,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que sus compañeras sean más amables , ella muy bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:34"
	},
	{
		"ID_CALIFICACION" : 420,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:45"
	},
	{
		"ID_CALIFICACION" : 427,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que sigan asi",
		"FECHA_REGISTRO" : "03.11.2025 12:28"
	},
	{
		"ID_CALIFICACION" : 435,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "04.11.2025 12:21"
	},
	{
		"ID_CALIFICACION" : 438,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los intereses muy altos!!!",
		"FECHA_REGISTRO" : "05.11.2025 10:18"
	},
	{
		"ID_CALIFICACION" : 440,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Mucho papeleo",
		"FECHA_REGISTRO" : "05.11.2025 10:33"
	},
	{
		"ID_CALIFICACION" : 441,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "05.11.2025 10:41"
	},
	{
		"ID_CALIFICACION" : 450,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien >á",
		"FECHA_REGISTRO" : "11.11.2025 09:52"
	},
	{
		"ID_CALIFICACION" : 458,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos!!! Urge que los bajen=5\r=«",
		"FECHA_REGISTRO" : "11.11.2025 10:36"
	},
	{
		"ID_CALIFICACION" : 459,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien=\u0003",
		"FECHA_REGISTRO" : "11.11.2025 11:22"
	},
	{
		"ID_CALIFICACION" : 466,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:32"
	},
	{
		"ID_CALIFICACION" : 483,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "En orden=\r",
		"FECHA_REGISTRO" : "12.11.2025 11:04"
	},
	{
		"ID_CALIFICACION" : 486,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "12.11.2025 11:14"
	},
	{
		"ID_CALIFICACION" : 491,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0005",
		"FECHA_REGISTRO" : "13.11.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 500,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien (\u000F",
		"FECHA_REGISTRO" : "13.11.2025 10:11"
	},
	{
		"ID_CALIFICACION" : 510,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos en el crédito hipotecario =N<û",
		"FECHA_REGISTRO" : "13.11.2025 11:09"
	},
	{
		"ID_CALIFICACION" : 528,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 09:28"
	},
	{
		"ID_CALIFICACION" : 536,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 09:59"
	},
	{
		"ID_CALIFICACION" : 550,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "14.11.2025 12:14"
	},
	{
		"ID_CALIFICACION" : 551,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0001",
		"FECHA_REGISTRO" : "19.11.2025 09:30"
	},
	{
		"ID_CALIFICACION" : 559,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ningún problema =M<û",
		"FECHA_REGISTRO" : "19.11.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 575,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Me atendió muy bien =\r",
		"FECHA_REGISTRO" : "19.11.2025 11:36"
	},
	{
		"ID_CALIFICACION" : 581,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos >\u0014",
		"FECHA_REGISTRO" : "19.11.2025 11:59"
	},
	{
		"ID_CALIFICACION" : 588,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bienn",
		"FECHA_REGISTRO" : "20.11.2025 09:48"
	},
	{
		"ID_CALIFICACION" : 590,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >\u0019<û",
		"FECHA_REGISTRO" : "20.11.2025 10:03"
	},
	{
		"ID_CALIFICACION" : 593,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO CORTO PLAZO CON AVAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "20.11.2025 10:08"
	},
	{
		"ID_CALIFICACION" : 602,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos, bastantes altos!!! Más del 20%=\u0014",
		"FECHA_REGISTRO" : "20.11.2025 11:14"
	},
	{
		"ID_CALIFICACION" : 603,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:19"
	},
	{
		"ID_CALIFICACION" : 612,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "21.11.2025 09:44"
	},
	{
		"ID_CALIFICACION" : 617,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien>p",
		"FECHA_REGISTRO" : "21.11.2025 09:54"
	},
	{
		"ID_CALIFICACION" : 648,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bienb",
		"FECHA_REGISTRO" : "21.11.2025 12:30"
	},
	{
		"ID_CALIFICACION" : 649,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 12:32"
	},
	{
		"ID_CALIFICACION" : 650,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Rebajen intereses ",
		"FECHA_REGISTRO" : "21.11.2025 12:35"
	},
	{
		"ID_CALIFICACION" : 655,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy caros>à",
		"FECHA_REGISTRO" : "24.11.2025 10:01"
	},
	{
		"ID_CALIFICACION" : 657,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "El asunto es raro tenia $12,000 y ahora son $10,000 es raro",
		"FECHA_REGISTRO" : "24.11.2025 11:09"
	},
	{
		"ID_CALIFICACION" : 658,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn>á",
		"FECHA_REGISTRO" : "24.11.2025 11:10"
	},
	{
		"ID_CALIFICACION" : 672,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn=\u000E",
		"FECHA_REGISTRO" : "26.11.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 680,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0003",
		"FECHA_REGISTRO" : "26.11.2025 10:36"
	},
	{
		"ID_CALIFICACION" : 682,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos >à",
		"FECHA_REGISTRO" : "26.11.2025 10:49"
	},
	{
		"ID_CALIFICACION" : 683,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "27.11.2025 09:57"
	},
	{
		"ID_CALIFICACION" : 685,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos >\u0012",
		"FECHA_REGISTRO" : "27.11.2025 11:32"
	},
	{
		"ID_CALIFICACION" : 686,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente >à",
		"FECHA_REGISTRO" : "01.12.2025 09:55"
	},
	{
		"ID_CALIFICACION" : 689,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente >á",
		"FECHA_REGISTRO" : "01.12.2025 10:01"
	},
	{
		"ID_CALIFICACION" : 690,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente >á",
		"FECHA_REGISTRO" : "01.12.2025 10:01"
	},
	{
		"ID_CALIFICACION" : 697,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 1,
		"COMENTARIO" : "Intereses muy altos, saco $2000 y me quitan $500=D",
		"FECHA_REGISTRO" : "01.12.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 698,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los intereses muy altos!!",
		"FECHA_REGISTRO" : "01.12.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 707,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "En desacuerdo con el registro ",
		"FECHA_REGISTRO" : "02.12.2025 10:02"
	},
	{
		"ID_CALIFICACION" : 709,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "En desacuerdo con el registro es innecesario =!",
		"FECHA_REGISTRO" : "02.12.2025 10:09"
	},
	{
		"ID_CALIFICACION" : 714,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "En desacuerdo con el registro de la entrada ",
		"FECHA_REGISTRO" : "02.12.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 718,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien pero quiten el registro de la entrada porfavorr",
		"FECHA_REGISTRO" : "02.12.2025 10:36"
	},
	{
		"ID_CALIFICACION" : 719,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos =\u0010",
		"FECHA_REGISTRO" : "02.12.2025 10:38"
	},
	{
		"ID_CALIFICACION" : 727,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente pero intereses están muy altos y sobre todo los de vivienda!",
		"FECHA_REGISTRO" : "03.12.2025 09:51"
	},
	{
		"ID_CALIFICACION" : 728,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente pero en desacuerdo con el registro de la entrada >à",
		"FECHA_REGISTRO" : "03.12.2025 09:53"
	},
	{
		"ID_CALIFICACION" : 730,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Por ahora todo bienn",
		"FECHA_REGISTRO" : "03.12.2025 10:10"
	},
	{
		"ID_CALIFICACION" : 732,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Pedí un préstamo de $10,176 y me descontaron $848 no chinguen",
		"FECHA_REGISTRO" : "03.12.2025 10:26"
	},
	{
		"ID_CALIFICACION" : 744,
		"NOMBRE" : "SANDRA KARINA RINCON MORA",
		"PUESTO" : "ENCARGADA DE PRESTAMOS A CORTO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/rincon_mora_sandra_karina_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Me atendieron muy bienn",
		"FECHA_REGISTRO" : "08.12.2025 10:13"
	},
	{
		"ID_CALIFICACION" : 114,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "RECIBO DE PENSIÓN",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "22.10.2025 09:34"
	},
	{
		"ID_CALIFICACION" : 144,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente servicio ",
		"FECHA_REGISTRO" : "22.10.2025 12:10"
	},
	{
		"ID_CALIFICACION" : 167,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que se especifique el espacio que se tiene asignado, quien viene a pensión",
		"FECHA_REGISTRO" : "23.10.2025 09:49"
	},
	{
		"ID_CALIFICACION" : 426,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que regresen el descuento ",
		"FECHA_REGISTRO" : "03.11.2025 12:25"
	},
	{
		"ID_CALIFICACION" : 474,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:59"
	},
	{
		"ID_CALIFICACION" : 494,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 09:57"
	},
	{
		"ID_CALIFICACION" : 505,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Buena experiencia y muy amable la muchacha que atendió explicó excelente ",
		"FECHA_REGISTRO" : "13.11.2025 10:34"
	},
	{
		"ID_CALIFICACION" : 511,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "ENTREGA DOCUMENTOS PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy gentil el personal>s",
		"FECHA_REGISTRO" : "13.11.2025 11:20"
	},
	{
		"ID_CALIFICACION" : 529,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "ENTREGA DOCUMENTOS PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien solo que diga los documentos que faltan para no dar vueltas",
		"FECHA_REGISTRO" : "14.11.2025 09:29"
	},
	{
		"ID_CALIFICACION" : 591,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buena chica=\u0017",
		"FECHA_REGISTRO" : "20.11.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 713,
		"NOMBRE" : "DULCE GUADALUPE PADILLA HERNÁNDEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/dulce_guadalupe_padilla_hernandez.webp",
		"SERVICIO" : "ENTREGA CREDENCIAL PENSIONADO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ya no nos dan intereses como antes a los pensionados >ä",
		"FECHA_REGISTRO" : "02.12.2025 10:19"
	},
	{
		"ID_CALIFICACION" : 40,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Siempre  e recibido una  buena atención ",
		"FECHA_REGISTRO" : "14.10.2025 11:00"
	},
	{
		"ID_CALIFICACION" : 41,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que sigan así con su atención ",
		"FECHA_REGISTRO" : "14.10.2025 11:08"
	},
	{
		"ID_CALIFICACION" : 42,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Tienen un trato  directo digno",
		"FECHA_REGISTRO" : "14.10.2025 11:11"
	},
	{
		"ID_CALIFICACION" : 52,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente atención ",
		"FECHA_REGISTRO" : "15.10.2025 10:59"
	},
	{
		"ID_CALIFICACION" : 59,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : " Muy buena",
		"FECHA_REGISTRO" : "20.10.2025 09:03"
	},
	{
		"ID_CALIFICACION" : 60,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio ",
		"FECHA_REGISTRO" : "20.10.2025 09:09"
	},
	{
		"ID_CALIFICACION" : 65,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente!!",
		"FECHA_REGISTRO" : "21.10.2025 09:42"
	},
	{
		"ID_CALIFICACION" : 75,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que así sigan con su actitud ",
		"FECHA_REGISTRO" : "21.10.2025 10:54"
	},
	{
		"ID_CALIFICACION" : 77,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Vino desde el viernes, y le dijeron que ya cambió el sistema ",
		"FECHA_REGISTRO" : "21.10.2025 10:57"
	},
	{
		"ID_CALIFICACION" : 78,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo esta muy buen ",
		"FECHA_REGISTRO" : "21.10.2025 10:59"
	},
	{
		"ID_CALIFICACION" : 79,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "21.10.2025 11:03"
	},
	{
		"ID_CALIFICACION" : 82,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "21.10.2025 11:05"
	},
	{
		"ID_CALIFICACION" : 88,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien todo bien",
		"FECHA_REGISTRO" : "21.10.2025 11:18"
	},
	{
		"ID_CALIFICACION" : 92,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Ya es diferente los préstamos ",
		"FECHA_REGISTRO" : "21.10.2025 11:26"
	},
	{
		"ID_CALIFICACION" : 93,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy rápido, bien atendida,  muy amable ",
		"FECHA_REGISTRO" : "21.10.2025 11:27"
	},
	{
		"ID_CALIFICACION" : 108,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Cobrar menos intereses",
		"FECHA_REGISTRO" : "22.10.2025 08:43"
	},
	{
		"ID_CALIFICACION" : 109,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "22.10.2025 08:52"
	},
	{
		"ID_CALIFICACION" : 120,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "22.10.2025 09:45"
	},
	{
		"ID_CALIFICACION" : 122,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "22.10.2025 09:59"
	},
	{
		"ID_CALIFICACION" : 123,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "22.10.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 136,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buen servicio ",
		"FECHA_REGISTRO" : "22.10.2025 11:02"
	},
	{
		"ID_CALIFICACION" : 148,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buena ",
		"FECHA_REGISTRO" : "23.10.2025 09:11"
	},
	{
		"ID_CALIFICACION" : 159,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Cobran muchos intereses",
		"FECHA_REGISTRO" : "23.10.2025 09:35"
	},
	{
		"ID_CALIFICACION" : 161,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que sea más sonriente ",
		"FECHA_REGISTRO" : "23.10.2025 09:37"
	},
	{
		"ID_CALIFICACION" : 173,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente atención ",
		"FECHA_REGISTRO" : "23.10.2025 10:17"
	},
	{
		"ID_CALIFICACION" : 174,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Felicidades por la atención ",
		"FECHA_REGISTRO" : "23.10.2025 10:21"
	},
	{
		"ID_CALIFICACION" : 177,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 178,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente servicio ",
		"FECHA_REGISTRO" : "23.10.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 179,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente trabajo ",
		"FECHA_REGISTRO" : "23.10.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 182,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "23.10.2025 10:41"
	},
	{
		"ID_CALIFICACION" : 186,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:58"
	},
	{
		"ID_CALIFICACION" : 188,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Deberían hacer prestamos más grandes ",
		"FECHA_REGISTRO" : "23.10.2025 11:03"
	},
	{
		"ID_CALIFICACION" : 189,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "23.10.2025 11:54"
	},
	{
		"ID_CALIFICACION" : 190,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buena",
		"FECHA_REGISTRO" : "23.10.2025 11:58"
	},
	{
		"ID_CALIFICACION" : 194,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Siga asi ",
		"FECHA_REGISTRO" : "23.10.2025 12:15"
	},
	{
		"ID_CALIFICACION" : 203,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 206,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien y rápido ",
		"FECHA_REGISTRO" : "24.10.2025 09:49"
	},
	{
		"ID_CALIFICACION" : 207,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "24.10.2025 09:50"
	},
	{
		"ID_CALIFICACION" : 208,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 09:52"
	},
	{
		"ID_CALIFICACION" : 209,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que no se cobra mucho el interés ",
		"FECHA_REGISTRO" : "24.10.2025 09:56"
	},
	{
		"ID_CALIFICACION" : 218,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 10:15"
	},
	{
		"ID_CALIFICACION" : 221,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "To do bien gente bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:21"
	},
	{
		"ID_CALIFICACION" : 222,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 240,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los intereses altos",
		"FECHA_REGISTRO" : "24.10.2025 11:29"
	},
	{
		"ID_CALIFICACION" : 242,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 12:10"
	},
	{
		"ID_CALIFICACION" : 252,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "27.10.2025 09:56"
	},
	{
		"ID_CALIFICACION" : 253,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Tiene una cuenta con mayor dinero y no le dan lo que exige",
		"FECHA_REGISTRO" : "27.10.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 257,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos",
		"FECHA_REGISTRO" : "27.10.2025 10:31"
	},
	{
		"ID_CALIFICACION" : 259,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "27.10.2025 12:08"
	},
	{
		"ID_CALIFICACION" : 260,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos y no lo regresan ",
		"FECHA_REGISTRO" : "27.10.2025 12:22"
	},
	{
		"ID_CALIFICACION" : 270,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Casi no te dan el dinero correspondiente ",
		"FECHA_REGISTRO" : "29.10.2025 09:42"
	},
	{
		"ID_CALIFICACION" : 272,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "29.10.2025 09:50"
	},
	{
		"ID_CALIFICACION" : 273,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 09:53"
	},
	{
		"ID_CALIFICACION" : 279,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:22"
	},
	{
		"ID_CALIFICACION" : 280,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:22"
	},
	{
		"ID_CALIFICACION" : 281,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 292,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que apliquen ",
		"FECHA_REGISTRO" : "29.10.2025 11:23"
	},
	{
		"ID_CALIFICACION" : 307,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "30.10.2025 09:11"
	},
	{
		"ID_CALIFICACION" : 312,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 09:32"
	},
	{
		"ID_CALIFICACION" : 329,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 345,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Quitan el interés ",
		"FECHA_REGISTRO" : "30.10.2025 10:43"
	},
	{
		"ID_CALIFICACION" : 349,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 10:55"
	},
	{
		"ID_CALIFICACION" : 350,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Cobran mucho ",
		"FECHA_REGISTRO" : "30.10.2025 10:55"
	},
	{
		"ID_CALIFICACION" : 351,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Amabilidad muy buena ",
		"FECHA_REGISTRO" : "30.10.2025 11:02"
	},
	{
		"ID_CALIFICACION" : 353,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 11:08"
	},
	{
		"ID_CALIFICACION" : 354,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 11:13"
	},
	{
		"ID_CALIFICACION" : 355,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 11:13"
	},
	{
		"ID_CALIFICACION" : 356,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Queja del plan de jubilación pésimos!!!",
		"FECHA_REGISTRO" : "30.10.2025 11:18"
	},
	{
		"ID_CALIFICACION" : 357,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Que presten mas $$$ y muy mala atención ni buenos dias",
		"FECHA_REGISTRO" : "30.10.2025 11:21"
	},
	{
		"ID_CALIFICACION" : 359,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 11:25"
	},
	{
		"ID_CALIFICACION" : 360,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 11:35"
	},
	{
		"ID_CALIFICACION" : 361,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "No quieren pagar lo justo",
		"FECHA_REGISTRO" : "30.10.2025 11:47"
	},
	{
		"ID_CALIFICACION" : 362,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos y quitarlos antes",
		"FECHA_REGISTRO" : "30.10.2025 11:49"
	},
	{
		"ID_CALIFICACION" : 363,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos y quitarlos antes",
		"FECHA_REGISTRO" : "30.10.2025 11:49"
	},
	{
		"ID_CALIFICACION" : 365,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todobien ",
		"FECHA_REGISTRO" : "30.10.2025 11:59"
	},
	{
		"ID_CALIFICACION" : 368,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente ",
		"FECHA_REGISTRO" : "30.10.2025 12:07"
	},
	{
		"ID_CALIFICACION" : 375,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 09:55"
	},
	{
		"ID_CALIFICACION" : 379,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 10:24"
	},
	{
		"ID_CALIFICACION" : 380,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Con nos pagan con un +",
		"FECHA_REGISTRO" : "31.10.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 382,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 11:10"
	},
	{
		"ID_CALIFICACION" : 383,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "No dan lo que deben",
		"FECHA_REGISTRO" : "31.10.2025 11:49"
	},
	{
		"ID_CALIFICACION" : 390,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que bajen los intereses ",
		"FECHA_REGISTRO" : "03.11.2025 09:20"
	},
	{
		"ID_CALIFICACION" : 397,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 403,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todobbien ",
		"FECHA_REGISTRO" : "03.11.2025 09:54"
	},
	{
		"ID_CALIFICACION" : 412,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:18"
	},
	{
		"ID_CALIFICACION" : 416,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 419,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:44"
	},
	{
		"ID_CALIFICACION" : 421,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:51"
	},
	{
		"ID_CALIFICACION" : 423,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:55"
	},
	{
		"ID_CALIFICACION" : 425,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 12:22"
	},
	{
		"ID_CALIFICACION" : 432,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Problema con el servicio isssspenet y dificultan el proceso ",
		"FECHA_REGISTRO" : "04.11.2025 10:58"
	},
	{
		"ID_CALIFICACION" : 437,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos",
		"FECHA_REGISTRO" : "05.11.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 443,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos",
		"FECHA_REGISTRO" : "07.11.2025 10:22"
	},
	{
		"ID_CALIFICACION" : 447,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos demasiados altos ",
		"FECHA_REGISTRO" : "07.11.2025 11:57"
	},
	{
		"ID_CALIFICACION" : 467,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO CORTO PLAZO CON AVAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien =\u0018",
		"FECHA_REGISTRO" : "12.11.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 473,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy muy altos y pocos beneficios para los pensionados =N<û",
		"FECHA_REGISTRO" : "12.11.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 488,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos y te cobran del mismo fondo >\u0014",
		"FECHA_REGISTRO" : "12.11.2025 11:27"
	},
	{
		"ID_CALIFICACION" : 489,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos y te cobran del mismo fondo >\u0014",
		"FECHA_REGISTRO" : "12.11.2025 11:27"
	},
	{
		"ID_CALIFICACION" : 495,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos=6",
		"FECHA_REGISTRO" : "13.11.2025 09:57"
	},
	{
		"ID_CALIFICACION" : 496,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien>*",
		"FECHA_REGISTRO" : "13.11.2025 10:00"
	},
	{
		"ID_CALIFICACION" : 499,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien >u",
		"FECHA_REGISTRO" : "13.11.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 525,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien=\t",
		"FECHA_REGISTRO" : "13.11.2025 12:09"
	},
	{
		"ID_CALIFICACION" : 527,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que están señoritas atendiendo y dejan solo ",
		"FECHA_REGISTRO" : "14.11.2025 09:26"
	},
	{
		"ID_CALIFICACION" : 531,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 09:35"
	},
	{
		"ID_CALIFICACION" : 545,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:51"
	},
	{
		"ID_CALIFICACION" : 548,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:59"
	},
	{
		"ID_CALIFICACION" : 557,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente brod\u000F\r>y",
		"FECHA_REGISTRO" : "19.11.2025 09:43"
	},
	{
		"ID_CALIFICACION" : 558,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Esta Guapa=\u0018",
		"FECHA_REGISTRO" : "19.11.2025 09:44"
	},
	{
		"ID_CALIFICACION" : 561,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien>)",
		"FECHA_REGISTRO" : "19.11.2025 09:47"
	},
	{
		"ID_CALIFICACION" : 562,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "A los pensionados no dan buenos intereses y a los activos si>(",
		"FECHA_REGISTRO" : "19.11.2025 09:49"
	},
	{
		"ID_CALIFICACION" : 565,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente con el Interés =\t",
		"FECHA_REGISTRO" : "19.11.2025 10:02"
	},
	{
		"ID_CALIFICACION" : 566,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Intereses muy altos, eso esta muy mal =!=$ son abusivos y rateros hijo de l",
		"FECHA_REGISTRO" : "19.11.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 569,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy bien!!",
		"FECHA_REGISTRO" : "19.11.2025 10:24"
	},
	{
		"ID_CALIFICACION" : 578,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Dudo sobre mi cuenta tenia $40.000 y ahora tengo $38.000 pos que paso=!",
		"FECHA_REGISTRO" : "19.11.2025 11:52"
	},
	{
		"ID_CALIFICACION" : 582,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Hacer todo electrónico",
		"FECHA_REGISTRO" : "20.11.2025 09:22"
	},
	{
		"ID_CALIFICACION" : 583,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "20.11.2025 09:31"
	},
	{
		"ID_CALIFICACION" : 596,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien =B",
		"FECHA_REGISTRO" : "20.11.2025 10:13"
	},
	{
		"ID_CALIFICACION" : 605,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo biemn",
		"FECHA_REGISTRO" : "21.11.2025 09:30"
	},
	{
		"ID_CALIFICACION" : 606,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:32"
	},
	{
		"ID_CALIFICACION" : 610,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:37"
	},
	{
		"ID_CALIFICACION" : 614,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >\u0019<û",
		"FECHA_REGISTRO" : "21.11.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 615,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0001",
		"FECHA_REGISTRO" : "21.11.2025 09:50"
	},
	{
		"ID_CALIFICACION" : 619,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente >\u0012",
		"FECHA_REGISTRO" : "21.11.2025 09:57"
	},
	{
		"ID_CALIFICACION" : 620,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Ningún problema =\u0003",
		"FECHA_REGISTRO" : "21.11.2025 10:01"
	},
	{
		"ID_CALIFICACION" : 622,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien=B",
		"FECHA_REGISTRO" : "21.11.2025 10:08"
	},
	{
		"ID_CALIFICACION" : 626,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente servicio =\u0017",
		"FECHA_REGISTRO" : "21.11.2025 10:16"
	},
	{
		"ID_CALIFICACION" : 627,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente!!!",
		"FECHA_REGISTRO" : "21.11.2025 10:19"
	},
	{
		"ID_CALIFICACION" : 630,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >\u0011",
		"FECHA_REGISTRO" : "21.11.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 633,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 10:42"
	},
	{
		"ID_CALIFICACION" : 640,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses los bajaron>\u0011>\u0011>\u0011>\u0011>\u0011",
		"FECHA_REGISTRO" : "21.11.2025 11:31"
	},
	{
		"ID_CALIFICACION" : 641,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien pero aunque sea más intereses para los jubilados!!!",
		"FECHA_REGISTRO" : "21.11.2025 11:40"
	},
	{
		"ID_CALIFICACION" : 645,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 12:21"
	},
	{
		"ID_CALIFICACION" : 651,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente <ƒ",
		"FECHA_REGISTRO" : "24.11.2025 09:54"
	},
	{
		"ID_CALIFICACION" : 654,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0017",
		"FECHA_REGISTRO" : "24.11.2025 10:00"
	},
	{
		"ID_CALIFICACION" : 660,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >p",
		"FECHA_REGISTRO" : "24.11.2025 11:15"
	},
	{
		"ID_CALIFICACION" : 675,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Gracias por todo ISSSSPEA!!!",
		"FECHA_REGISTRO" : "26.11.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 676,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente =\u0007",
		"FECHA_REGISTRO" : "26.11.2025 10:26"
	},
	{
		"ID_CALIFICACION" : 688,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos 9\u000F",
		"FECHA_REGISTRO" : "01.12.2025 09:59"
	},
	{
		"ID_CALIFICACION" : 691,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los Intereses muy altos =5\r=«",
		"FECHA_REGISTRO" : "01.12.2025 10:02"
	},
	{
		"ID_CALIFICACION" : 699,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Los intereses muy altos =6",
		"FECHA_REGISTRO" : "01.12.2025 10:33"
	},
	{
		"ID_CALIFICACION" : 706,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos y en desacuerdo con el registro!!!",
		"FECHA_REGISTRO" : "01.12.2025 12:20"
	},
	{
		"ID_CALIFICACION" : 710,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente pero el registro en la entrada es innecesario =N<û",
		"FECHA_REGISTRO" : "02.12.2025 10:13"
	},
	{
		"ID_CALIFICACION" : 725,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn",
		"FECHA_REGISTRO" : "03.12.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 741,
		"NOMBRE" : "CLAUDIA ALEJANDRA PALAFOX CONTRERAS ",
		"PUESTO" : "AUX DE PRESTAMOS A CORTO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/palafox_contreras_claudia_alejandra_oc.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo muy bienn",
		"FECHA_REGISTRO" : "08.12.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 22,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy amable",
		"FECHA_REGISTRO" : "22.08.2025 13:44"
	},
	{
		"ID_CALIFICACION" : 50,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "15.10.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 57,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Fue muy amable ",
		"FECHA_REGISTRO" : "15.10.2025 12:33"
	},
	{
		"ID_CALIFICACION" : 246,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "27.10.2025 09:35"
	},
	{
		"ID_CALIFICACION" : 288,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:50"
	},
	{
		"ID_CALIFICACION" : 299,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "29.10.2025 12:19"
	},
	{
		"ID_CALIFICACION" : 352,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 11:05"
	},
	{
		"ID_CALIFICACION" : 394,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:27"
	},
	{
		"ID_CALIFICACION" : 395,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "03.11.2025 09:28"
	},
	{
		"ID_CALIFICACION" : 406,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:59"
	},
	{
		"ID_CALIFICACION" : 411,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:13"
	},
	{
		"ID_CALIFICACION" : 454,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy guapa la señorita ",
		"FECHA_REGISTRO" : "11.11.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 462,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:24"
	},
	{
		"ID_CALIFICACION" : 476,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente =\u000C",
		"FECHA_REGISTRO" : "12.11.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 480,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 10:44"
	},
	{
		"ID_CALIFICACION" : 481,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 10:50"
	},
	{
		"ID_CALIFICACION" : 537,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 635,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 10:47"
	},
	{
		"ID_CALIFICACION" : 646,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que fueran más rápidos en la entrega de documentos que solicitan ",
		"FECHA_REGISTRO" : "21.11.2025 12:23"
	},
	{
		"ID_CALIFICACION" : 661,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : ":\u000F todo bien",
		"FECHA_REGISTRO" : "24.11.2025 11:22"
	},
	{
		"ID_CALIFICACION" : 705,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "En desacuerdo con el registro al entrar ",
		"FECHA_REGISTRO" : "01.12.2025 12:17"
	},
	{
		"ID_CALIFICACION" : 726,
		"NOMBRE" : "DIANA LAURA RUIZ ESPRAZA",
		"PUESTO" : "ENCARGADA PAGOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ruiz_esparza_mojarro_diana_laura_oc.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "03.12.2025 09:49"
	},
	{
		"ID_CALIFICACION" : 64,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Talentoso",
		"FECHA_REGISTRO" : "20.10.2025 10:22"
	},
	{
		"ID_CALIFICACION" : 143,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buena atención ",
		"FECHA_REGISTRO" : "22.10.2025 12:07"
	},
	{
		"ID_CALIFICACION" : 183,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:41"
	},
	{
		"ID_CALIFICACION" : 255,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "27.10.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 261,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Para obtener información es un progreso muy fastidioso",
		"FECHA_REGISTRO" : "27.10.2025 12:24"
	},
	{
		"ID_CALIFICACION" : 327,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:00"
	},
	{
		"ID_CALIFICACION" : 340,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:31"
	},
	{
		"ID_CALIFICACION" : 422,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:53"
	},
	{
		"ID_CALIFICACION" : 469,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:37"
	},
	{
		"ID_CALIFICACION" : 470,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:37"
	},
	{
		"ID_CALIFICACION" : 549,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 12:11"
	},
	{
		"ID_CALIFICACION" : 567,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente >\u0017",
		"FECHA_REGISTRO" : "19.11.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 607,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:32"
	},
	{
		"ID_CALIFICACION" : 611,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn",
		"FECHA_REGISTRO" : "21.11.2025 09:39"
	},
	{
		"ID_CALIFICACION" : 621,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todobien ",
		"FECHA_REGISTRO" : "21.11.2025 10:03"
	},
	{
		"ID_CALIFICACION" : 623,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "RECIBO DE PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0007",
		"FECHA_REGISTRO" : "21.11.2025 10:13"
	},
	{
		"ID_CALIFICACION" : 638,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bienn Pero me han hecho venir 3 veces necesito respuestas!!!",
		"FECHA_REGISTRO" : "21.11.2025 11:13"
	},
	{
		"ID_CALIFICACION" : 644,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo ben ",
		"FECHA_REGISTRO" : "21.11.2025 12:15"
	},
	{
		"ID_CALIFICACION" : 659,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente 10\/10",
		"FECHA_REGISTRO" : "24.11.2025 11:13"
	},
	{
		"ID_CALIFICACION" : 662,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "ENTREGA DOCUMENTOS PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente =\u0018",
		"FECHA_REGISTRO" : "24.11.2025 11:25"
	},
	{
		"ID_CALIFICACION" : 704,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "ENTREGA CREDENCIAL PENSIONADO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "No me han dado mi certificado de la pensión desde febrero!!",
		"FECHA_REGISTRO" : "01.12.2025 10:49"
	},
	{
		"ID_CALIFICACION" : 751,
		"NOMBRE" : "JOSÉ GERARDO SÁNCHEZ GARIBAY",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/jose_gerardo_sanchez_garibay.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "En desacuerdo con el registro es una pérdida de tiempo!!!",
		"FECHA_REGISTRO" : "08.12.2025 12:00"
	},
	{
		"ID_CALIFICACION" : 86,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buena, muy rapido",
		"FECHA_REGISTRO" : "21.10.2025 11:12"
	},
	{
		"ID_CALIFICACION" : 135,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "22.10.2025 10:50"
	},
	{
		"ID_CALIFICACION" : 163,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buena atención, muy rápida ",
		"FECHA_REGISTRO" : "23.10.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 185,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:44"
	},
	{
		"ID_CALIFICACION" : 191,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que la cambien  ",
		"FECHA_REGISTRO" : "23.10.2025 12:02"
	},
	{
		"ID_CALIFICACION" : 210,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Agil",
		"FECHA_REGISTRO" : "24.10.2025 10:01"
	},
	{
		"ID_CALIFICACION" : 216,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "24.10.2025 10:11"
	},
	{
		"ID_CALIFICACION" : 228,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:44"
	},
	{
		"ID_CALIFICACION" : 235,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 10:57"
	},
	{
		"ID_CALIFICACION" : 243,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "24.10.2025 12:21"
	},
	{
		"ID_CALIFICACION" : 248,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "27.10.2025 09:41"
	},
	{
		"ID_CALIFICACION" : 249,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que tengan más acceso a más información ",
		"FECHA_REGISTRO" : "27.10.2025 09:45"
	},
	{
		"ID_CALIFICACION" : 250,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "27.10.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 251,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Estaba en otro asunto y no le hacía caso",
		"FECHA_REGISTRO" : "27.10.2025 09:54"
	},
	{
		"ID_CALIFICACION" : 256,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que tengan registro de las personas que están trabajando ",
		"FECHA_REGISTRO" : "27.10.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 258,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "27.10.2025 10:31"
	},
	{
		"ID_CALIFICACION" : 264,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 09:14"
	},
	{
		"ID_CALIFICACION" : 265,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "29.10.2025 09:15"
	},
	{
		"ID_CALIFICACION" : 267,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 09:27"
	},
	{
		"ID_CALIFICACION" : 269,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Que pasen más de pensión a los mayores",
		"FECHA_REGISTRO" : "29.10.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 274,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que pongan más atención a los clientes",
		"FECHA_REGISTRO" : "29.10.2025 09:56"
	},
	{
		"ID_CALIFICACION" : 275,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Cumplir impuestos ",
		"FECHA_REGISTRO" : "29.10.2025 10:02"
	},
	{
		"ID_CALIFICACION" : 278,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:19"
	},
	{
		"ID_CALIFICACION" : 282,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:26"
	},
	{
		"ID_CALIFICACION" : 295,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 12:01"
	},
	{
		"ID_CALIFICACION" : 301,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 12:22"
	},
	{
		"ID_CALIFICACION" : 311,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Muy buen servicio ",
		"FECHA_REGISTRO" : "30.10.2025 09:27"
	},
	{
		"ID_CALIFICACION" : 318,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 09:41"
	},
	{
		"ID_CALIFICACION" : 326,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 346,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Más agilidad en la entrega de las cosas",
		"FECHA_REGISTRO" : "30.10.2025 10:44"
	},
	{
		"ID_CALIFICACION" : 366,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 12:03"
	},
	{
		"ID_CALIFICACION" : 371,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 12:26"
	},
	{
		"ID_CALIFICACION" : 372,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 12:35"
	},
	{
		"ID_CALIFICACION" : 388,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:17"
	},
	{
		"ID_CALIFICACION" : 398,
		"NOMBRE" : "SILVIA GORETI LOPEZ LOPEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/silvia_goreti_lopez_lopez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:37"
	},
	{
		"ID_CALIFICACION" : 98,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "21.10.2025 12:09"
	},
	{
		"ID_CALIFICACION" : 160,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente y que sigan así ",
		"FECHA_REGISTRO" : "23.10.2025 09:35"
	},
	{
		"ID_CALIFICACION" : 236,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 11:03"
	},
	{
		"ID_CALIFICACION" : 238,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que saquen copias ",
		"FECHA_REGISTRO" : "24.10.2025 11:05"
	},
	{
		"ID_CALIFICACION" : 389,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:18"
	},
	{
		"ID_CALIFICACION" : 400,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 401,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:49"
	},
	{
		"ID_CALIFICACION" : 418,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:36"
	},
	{
		"ID_CALIFICACION" : 490,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 09:41"
	},
	{
		"ID_CALIFICACION" : 503,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 10:18"
	},
	{
		"ID_CALIFICACION" : 535,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 09:47"
	},
	{
		"ID_CALIFICACION" : 539,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 540,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:19"
	},
	{
		"ID_CALIFICACION" : 586,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que resuelvan más dudas y no denigren por estar pensionados ",
		"FECHA_REGISTRO" : "20.11.2025 09:42"
	},
	{
		"ID_CALIFICACION" : 601,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "20.11.2025 10:31"
	},
	{
		"ID_CALIFICACION" : 618,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:56"
	},
	{
		"ID_CALIFICACION" : 647,
		"NOMBRE" : "CLAUDIA ÁVILA ROMERO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/claudia_avila_romero.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 12:25"
	},
	{
		"ID_CALIFICACION" : 23,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTINEZ",
		"PUESTO" : "ENTREGA DE CHEQUES",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA DE CHEQUE",
		"CALIFICACION" : 5,
		"COMENTARIO" : "sdad",
		"FECHA_REGISTRO" : "22.08.2025 14:45"
	},
	{
		"ID_CALIFICACION" : 34,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTINEZ",
		"PUESTO" : "ENTREGA DE CHEQUES",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 5,
		"COMENTARIO" : "ww",
		"FECHA_REGISTRO" : "19.09.2025 13:56"
	},
	{
		"ID_CALIFICACION" : 35,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTINEZ",
		"PUESTO" : "ENTREGA DE CHEQUES",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA DE CHEQUE",
		"CALIFICACION" : 5,
		"COMENTARIO" : "sss",
		"FECHA_REGISTRO" : "19.09.2025 14:53"
	},
	{
		"ID_CALIFICACION" : 212,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTINEZ",
		"PUESTO" : "ENTREGA DE CHEQUES",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 10:05"
	},
	{
		"ID_CALIFICACION" : 100,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "21.10.2025 12:13"
	},
	{
		"ID_CALIFICACION" : 139,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy amable y muy resolutivo ",
		"FECHA_REGISTRO" : "22.10.2025 12:02"
	},
	{
		"ID_CALIFICACION" : 151,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Es muy amable",
		"FECHA_REGISTRO" : "23.10.2025 09:16"
	},
	{
		"ID_CALIFICACION" : 152,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Fue muy rápido, todo fue exelente",
		"FECHA_REGISTRO" : "23.10.2025 09:18"
	},
	{
		"ID_CALIFICACION" : 157,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "23.10.2025 09:33"
	},
	{
		"ID_CALIFICACION" : 166,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "23.10.2025 09:49"
	},
	{
		"ID_CALIFICACION" : 168,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 09:55"
	},
	{
		"ID_CALIFICACION" : 169,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "23.10.2025 10:01"
	},
	{
		"ID_CALIFICACION" : 219,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:20"
	},
	{
		"ID_CALIFICACION" : 507,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 10:53"
	},
	{
		"ID_CALIFICACION" : 523,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 5,
		"COMENTARIO" : "La aplicación ISSSSPENET no se actualiza, envié mis datos hace dos meses =6",
		"FECHA_REGISTRO" : "13.11.2025 12:04"
	},
	{
		"ID_CALIFICACION" : 560,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio =\u0007",
		"FECHA_REGISTRO" : "19.11.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 613,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "21.11.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 616,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:51"
	},
	{
		"ID_CALIFICACION" : 729,
		"NOMBRE" : "LUIS ALBERTO DE ANDA MARTÍNEZ",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/luis_alberto_de_anda_martinez.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy bien todoo",
		"FECHA_REGISTRO" : "03.12.2025 09:54"
	},
	{
		"ID_CALIFICACION" : 53,
		"NOMBRE" : "ABRAHAM CUELLAR SANDOVAL",
		"PUESTO" : "ENCARGADO DE PRÉSTAMOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/cuellar_sandoval_abraham_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy agradecida con Abraham. Muy atento y rápido ",
		"FECHA_REGISTRO" : "15.10.2025 11:55"
	},
	{
		"ID_CALIFICACION" : 164,
		"NOMBRE" : "ABRAHAM CUELLAR SANDOVAL",
		"PUESTO" : "ENCARGADO DE PRÉSTAMOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/cuellar_sandoval_abraham_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Servicio bien ",
		"FECHA_REGISTRO" : "23.10.2025 09:42"
	},
	{
		"ID_CALIFICACION" : 266,
		"NOMBRE" : "ABRAHAM CUELLAR SANDOVAL",
		"PUESTO" : "ENCARGADO DE PRÉSTAMOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/cuellar_sandoval_abraham_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 09:21"
	},
	{
		"ID_CALIFICACION" : 342,
		"NOMBRE" : "ABRAHAM CUELLAR SANDOVAL",
		"PUESTO" : "ENCARGADO DE PRÉSTAMOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/cuellar_sandoval_abraham_oc.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:34"
	},
	{
		"ID_CALIFICACION" : 592,
		"NOMBRE" : "ABRAHAM CUELLAR SANDOVAL",
		"PUESTO" : "ENCARGADO DE PRÉSTAMOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/cuellar_sandoval_abraham_oc.webp",
		"SERVICIO" : "ENTREGA DOCUMENTOS PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Excelente servicio ",
		"FECHA_REGISTRO" : "20.11.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 594,
		"NOMBRE" : "ABRAHAM CUELLAR SANDOVAL",
		"PUESTO" : "ENCARGADO DE PRÉSTAMOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/cuellar_sandoval_abraham_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que sean más atentos al servicio ",
		"FECHA_REGISTRO" : "20.11.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 26,
		"NOMBRE" : "XIMENA MARTINEZ CHAVEZ",
		"PUESTO" : "AUX DE PRESTAMOS HIPOTECARIOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/martinez_chavez_ximena_oc.webp",
		"SERVICIO" : "REESTRUCTURA PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Rsgh",
		"FECHA_REGISTRO" : "22.08.2025 15:15"
	},
	{
		"ID_CALIFICACION" : 27,
		"NOMBRE" : "XIMENA MARTINEZ CHAVEZ",
		"PUESTO" : "AUX DE PRESTAMOS HIPOTECARIOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/martinez_chavez_ximena_oc.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "fdfgg",
		"FECHA_REGISTRO" : "05.09.2025 10:00"
	},
	{
		"ID_CALIFICACION" : 31,
		"NOMBRE" : "XIMENA MARTINEZ CHAVEZ",
		"PUESTO" : "AUX DE PRESTAMOS HIPOTECARIOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/martinez_chavez_ximena_oc.webp",
		"SERVICIO" : "REESTRUCTURA PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente ",
		"FECHA_REGISTRO" : "08.09.2025 13:08"
	},
	{
		"ID_CALIFICACION" : 33,
		"NOMBRE" : "XIMENA MARTINEZ CHAVEZ",
		"PUESTO" : "AUX DE PRESTAMOS HIPOTECARIOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/martinez_chavez_ximena_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio",
		"FECHA_REGISTRO" : "17.09.2025 13:12"
	},
	{
		"ID_CALIFICACION" : 68,
		"NOMBRE" : "MÓNICA ESMERALDA ORTÍZ DÁVILA",
		"PUESTO" : "AUXILIAR DE PRÉSTAMOS HIPOTECARIOS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ortiz_davila_monica_esmeralda_oc.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 1,
		"COMENTARIO" : "La trato mal ",
		"FECHA_REGISTRO" : "21.10.2025 10:11"
	},
	{
		"ID_CALIFICACION" : 129,
		"NOMBRE" : "MÓNICA ESMERALDA ORTÍZ DÁVILA",
		"PUESTO" : "AUXILIAR DE PRÉSTAMOS HIPOTECARIOS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ortiz_davila_monica_esmeralda_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "22.10.2025 10:23"
	},
	{
		"ID_CALIFICACION" : 283,
		"NOMBRE" : "MÓNICA ESMERALDA ORTÍZ DÁVILA",
		"PUESTO" : "AUXILIAR DE PRÉSTAMOS HIPOTECARIOS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ortiz_davila_monica_esmeralda_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "29.10.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 335,
		"NOMBRE" : "MÓNICA ESMERALDA ORTÍZ DÁVILA",
		"PUESTO" : "AUXILIAR DE PRÉSTAMOS HIPOTECARIOS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ortiz_davila_monica_esmeralda_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:23"
	},
	{
		"ID_CALIFICACION" : 472,
		"NOMBRE" : "MÓNICA ESMERALDA ORTÍZ DÁVILA",
		"PUESTO" : "AUXILIAR DE PRÉSTAMOS HIPOTECARIOS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ortiz_davila_monica_esmeralda_oc.webp",
		"SERVICIO" : "ENTREGA DOCUMENTOS PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:41"
	},
	{
		"ID_CALIFICACION" : 653,
		"NOMBRE" : "MÓNICA ESMERALDA ORTÍZ DÁVILA",
		"PUESTO" : "AUXILIAR DE PRÉSTAMOS HIPOTECARIOS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/ortiz_davila_monica_esmeralda_oc.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ningún problema >á",
		"FECHA_REGISTRO" : "24.11.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 147,
		"NOMBRE" : "FATIMA SUJEY CORTES CAPETILLO ",
		"PUESTO" : "JEFA DE PRESTAMOS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/cortes_capetillo_fatima_sujey_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Le agradece sus servicios ",
		"FECHA_REGISTRO" : "22.10.2025 12:24"
	},
	{
		"ID_CALIFICACION" : 28,
		"NOMBRE" : "ANA PATRICIA MACÍAS VELA",
		"PUESTO" : "ENCARGADA DE PRÉSTAMOS A MEDIANO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/macias_vela_ana_patricia_oc.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO BIENES DE CONSUMO DURADERO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "l",
		"FECHA_REGISTRO" : "08.09.2025 09:39"
	},
	{
		"ID_CALIFICACION" : 30,
		"NOMBRE" : "ANA PATRICIA MACÍAS VELA",
		"PUESTO" : "ENCARGADA DE PRÉSTAMOS A MEDIANO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/macias_vela_ana_patricia_oc.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO DE BIENES DE CONSUMO DURADERO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Nin7h",
		"FECHA_REGISTRO" : "08.09.2025 12:52"
	},
	{
		"ID_CALIFICACION" : 46,
		"NOMBRE" : "ANA PATRICIA MACÍAS VELA",
		"PUESTO" : "ENCARGADA DE PRÉSTAMOS A MEDIANO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/macias_vela_ana_patricia_oc.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO DE BIENES DE CONSUMO DURADERO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy amable y muy atenta ",
		"FECHA_REGISTRO" : "14.10.2025 12:47"
	},
	{
		"ID_CALIFICACION" : 229,
		"NOMBRE" : "ANA PATRICIA MACÍAS VELA",
		"PUESTO" : "ENCARGADA DE PRÉSTAMOS A MEDIANO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/macias_vela_ana_patricia_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien felicidades ",
		"FECHA_REGISTRO" : "24.10.2025 10:45"
	},
	{
		"ID_CALIFICACION" : 276,
		"NOMBRE" : "ANA PATRICIA MACÍAS VELA",
		"PUESTO" : "ENCARGADA DE PRÉSTAMOS A MEDIANO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/macias_vela_ana_patricia_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que le pongan teléfono al joven alain",
		"FECHA_REGISTRO" : "29.10.2025 10:17"
	},
	{
		"ID_CALIFICACION" : 302,
		"NOMBRE" : "ANA PATRICIA MACÍAS VELA",
		"PUESTO" : "ENCARGADA DE PRÉSTAMOS A MEDIANO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/macias_vela_ana_patricia_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "29.10.2025 12:23"
	},
	{
		"ID_CALIFICACION" : 97,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.10.2025 12:00"
	},
	{
		"ID_CALIFICACION" : 127,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "22.10.2025 10:16"
	},
	{
		"ID_CALIFICACION" : 192,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "23.10.2025 12:12"
	},
	{
		"ID_CALIFICACION" : 226,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "REESTRUCTURA PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que no esté la de recepción y más amabilidad en ella",
		"FECHA_REGISTRO" : "24.10.2025 10:43"
	},
	{
		"ID_CALIFICACION" : 314,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses altos ",
		"FECHA_REGISTRO" : "30.10.2025 09:33"
	},
	{
		"ID_CALIFICACION" : 331,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:15"
	},
	{
		"ID_CALIFICACION" : 449,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "REESTRUCTURA PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses del préstamo hipotecario son muy altos ",
		"FECHA_REGISTRO" : "11.11.2025 09:48"
	},
	{
		"ID_CALIFICACION" : 492,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente =\u0018 VIVA TERE JIMENEZ=\r",
		"FECHA_REGISTRO" : "13.11.2025 09:50"
	},
	{
		"ID_CALIFICACION" : 521,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy  altos =\u0012",
		"FECHA_REGISTRO" : "13.11.2025 11:58"
	},
	{
		"ID_CALIFICACION" : 556,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente!!!",
		"FECHA_REGISTRO" : "19.11.2025 09:41"
	},
	{
		"ID_CALIFICACION" : 712,
		"NOMBRE" : "MARIA ELENA MEDRANO LOERA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/maria_elena_medrano_loera.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente >\u0019<û",
		"FECHA_REGISTRO" : "02.12.2025 10:15"
	},
	{
		"ID_CALIFICACION" : 90,
		"NOMBRE" : "MARCOS EDIER ARAIZA CAMPOS",
		"PUESTO" : "AUX. DE PRESTAMOS A MEDIANO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/araiza_campos_marcos_edier_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "21.10.2025 11:19"
	},
	{
		"ID_CALIFICACION" : 364,
		"NOMBRE" : "MARCOS EDIER ARAIZA CAMPOS",
		"PUESTO" : "AUX. DE PRESTAMOS A MEDIANO PLAZO",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/araiza_campos_marcos_edier_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 11:57"
	},
	{
		"ID_CALIFICACION" : 117,
		"NOMBRE" : "ALAIN ORTEGA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/alain_ortega.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "22.10.2025 09:39"
	},
	{
		"ID_CALIFICACION" : 150,
		"NOMBRE" : "ALAIN ORTEGA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/alain_ortega.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buen servicio ",
		"FECHA_REGISTRO" : "23.10.2025 09:13"
	},
	{
		"ID_CALIFICACION" : 285,
		"NOMBRE" : "ALAIN ORTEGA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/alain_ortega.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:36"
	},
	{
		"ID_CALIFICACION" : 604,
		"NOMBRE" : "ALAIN ORTEGA",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/alain_ortega.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:25"
	},
	{
		"ID_CALIFICACION" : 39,
		"NOMBRE" : "ALMA ROSA ROMO DELGADO",
		"PUESTO" : "DIRECTORA DE PRESTACIONES SOCIALES",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/romo_delgado_alma_rosa_oc.webp",
		"SERVICIO" : "INFORMACIÓN SERVICIO DE GUARDERÍAS",
		"CALIFICACION" : 5,
		"COMENTARIO" : ".",
		"FECHA_REGISTRO" : "14.10.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 36,
		"NOMBRE" : "CHRISTIAN GUSTAVO PEREZ CAMPOS",
		"PUESTO" : "JEFE DEL DEPARTAMENTO DE PENSIONES",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/perez_campos_christian_gustavo_oc.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "fff",
		"FECHA_REGISTRO" : "22.09.2025 08:35"
	},
	{
		"ID_CALIFICACION" : 29,
		"NOMBRE" : "CLAUDIA ELIZABETH GALLARDO MONTOYA",
		"PUESTO" : "AUXILIAR DE PENSIONES Y SEGUROS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/gallardo_montoya_claudia_elizabeth_oc.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ya quedo",
		"FECHA_REGISTRO" : "08.09.2025 12:49"
	},
	{
		"ID_CALIFICACION" : 146,
		"NOMBRE" : "CLAUDIA ELIZABETH GALLARDO MONTOYA",
		"PUESTO" : "AUXILIAR DE PENSIONES Y SEGUROS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/gallardo_montoya_claudia_elizabeth_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Muy bueno todo ",
		"FECHA_REGISTRO" : "22.10.2025 12:21"
	},
	{
		"ID_CALIFICACION" : 66,
		"NOMBRE" : "MARIELA SANTOS VAZQUEZ",
		"PUESTO" : "AUX DE PENSIONES Y SEGUROS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/santos_vazquez_mariela_oc.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ee",
		"FECHA_REGISTRO" : "21.10.2025 10:08"
	},
	{
		"ID_CALIFICACION" : 290,
		"NOMBRE" : "MARIELA SANTOS VAZQUEZ",
		"PUESTO" : "AUX DE PENSIONES Y SEGUROS ",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/santos_vazquez_mariela_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "29.10.2025 10:56"
	},
	{
		"ID_CALIFICACION" : 217,
		"NOMBRE" : "ANDRES DE JESUS CAMACHO NAVARRO",
		"PUESTO" : "AUX DE PENSIONES Y SEGUROS",
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/camacho_navarro_andres_de_jesus_oc.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:13"
	},
	{
		"ID_CALIFICACION" : 45,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente",
		"FECHA_REGISTRO" : "14.10.2025 12:38"
	},
	{
		"ID_CALIFICACION" : 48,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Ya no puede disponer uno de su dinero ",
		"FECHA_REGISTRO" : "15.10.2025 10:17"
	},
	{
		"ID_CALIFICACION" : 49,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Conforme ",
		"FECHA_REGISTRO" : "15.10.2025 10:21"
	},
	{
		"ID_CALIFICACION" : 51,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Trabajan muy bien y muy buena calidad de servicio ",
		"FECHA_REGISTRO" : "15.10.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 54,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente atención y servicio ",
		"FECHA_REGISTRO" : "15.10.2025 12:00"
	},
	{
		"ID_CALIFICACION" : 55,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente servicio ",
		"FECHA_REGISTRO" : "15.10.2025 12:02"
	},
	{
		"ID_CALIFICACION" : 56,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que le vaya bien y que Dios bendiga a la persona que lo atendió ",
		"FECHA_REGISTRO" : "15.10.2025 12:09"
	},
	{
		"ID_CALIFICACION" : 58,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Excelente!!",
		"FECHA_REGISTRO" : "20.10.2025 08:49"
	},
	{
		"ID_CALIFICACION" : 61,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buena",
		"FECHA_REGISTRO" : "20.10.2025 09:17"
	},
	{
		"ID_CALIFICACION" : 67,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN SERVICIO DE GUARDERÍAS",
		"CALIFICACION" : 4,
		"COMENTARIO" : "\nBien",
		"FECHA_REGISTRO" : "21.10.2025 10:10"
	},
	{
		"ID_CALIFICACION" : 70,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "21.10.2025 10:37"
	},
	{
		"ID_CALIFICACION" : 71,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO DE BIENES DE CONSUMO DURADERO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Es lo que hace su institución que le cobran  mucho a los mayores de edad y ",
		"FECHA_REGISTRO" : "21.10.2025 10:40"
	},
	{
		"ID_CALIFICACION" : 72,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "21.10.2025 10:43"
	},
	{
		"ID_CALIFICACION" : 73,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "No respetan turno ",
		"FECHA_REGISTRO" : "21.10.2025 10:49"
	},
	{
		"ID_CALIFICACION" : 74,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Normal  cobro de intereses trato a los pensionados de la ley y préstamos co",
		"FECHA_REGISTRO" : "21.10.2025 10:52"
	},
	{
		"ID_CALIFICACION" : 76,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "BIEN BAÑOS ",
		"FECHA_REGISTRO" : "21.10.2025 10:56"
	},
	{
		"ID_CALIFICACION" : 80,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "21.10.2025 11:03"
	},
	{
		"ID_CALIFICACION" : 81,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.10.2025 11:05"
	},
	{
		"ID_CALIFICACION" : 83,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "21.10.2025 11:06"
	},
	{
		"ID_CALIFICACION" : 84,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "21.10.2025 11:07"
	},
	{
		"ID_CALIFICACION" : 85,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todobien rápido ",
		"FECHA_REGISTRO" : "21.10.2025 11:10"
	},
	{
		"ID_CALIFICACION" : 87,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "21.10.2025 11:15"
	},
	{
		"ID_CALIFICACION" : 89,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy caros los intereses ",
		"FECHA_REGISTRO" : "21.10.2025 11:19"
	},
	{
		"ID_CALIFICACION" : 94,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN ISSSSPENET",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Muy bien ",
		"FECHA_REGISTRO" : "21.10.2025 11:31"
	},
	{
		"ID_CALIFICACION" : 95,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente ",
		"FECHA_REGISTRO" : "21.10.2025 11:38"
	},
	{
		"ID_CALIFICACION" : 96,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses están muy altos =\u0012",
		"FECHA_REGISTRO" : "21.10.2025 11:39"
	},
	{
		"ID_CALIFICACION" : 99,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN SERVICIO DE GUARDERÍAS",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "21.10.2025 12:12"
	},
	{
		"ID_CALIFICACION" : 101,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Los esta dañando con los intereses ",
		"FECHA_REGISTRO" : "21.10.2025 12:18"
	},
	{
		"ID_CALIFICACION" : 102,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "21.10.2025 12:20"
	},
	{
		"ID_CALIFICACION" : 103,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA CREDENCIAL PENSIONADO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "21.10.2025 12:21"
	},
	{
		"ID_CALIFICACION" : 104,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Buena ",
		"FECHA_REGISTRO" : "21.10.2025 12:22"
	},
	{
		"ID_CALIFICACION" : 106,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "21.10.2025 12:32"
	},
	{
		"ID_CALIFICACION" : 110,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los préstamos hipotecarios te piden un porcentaje del valor 9\u000F",
		"FECHA_REGISTRO" : "22.10.2025 08:56"
	},
	{
		"ID_CALIFICACION" : 111,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Muy altos los intereses !!!",
		"FECHA_REGISTRO" : "22.10.2025 09:01"
	},
	{
		"ID_CALIFICACION" : 112,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Buen servicio ",
		"FECHA_REGISTRO" : "22.10.2025 09:07"
	},
	{
		"ID_CALIFICACION" : 113,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Hay mucha irregularidad y errores de cálculo en credito hipotecario $",
		"FECHA_REGISTRO" : "22.10.2025 09:15"
	},
	{
		"ID_CALIFICACION" : 115,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "22.10.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 116,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los días de quincena haya cajas abiertas",
		"FECHA_REGISTRO" : "22.10.2025 09:38"
	},
	{
		"ID_CALIFICACION" : 121,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "22.10.2025 09:50"
	},
	{
		"ID_CALIFICACION" : 124,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Muy bien no está leno ",
		"FECHA_REGISTRO" : "22.10.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 125,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que había servicio mejor",
		"FECHA_REGISTRO" : "22.10.2025 10:08"
	},
	{
		"ID_CALIFICACION" : 126,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que hay personas ahí y no atienden ",
		"FECHA_REGISTRO" : "22.10.2025 10:11"
	},
	{
		"ID_CALIFICACION" : 128,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Es ta todo bien ",
		"FECHA_REGISTRO" : "22.10.2025 10:23"
	},
	{
		"ID_CALIFICACION" : 130,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Gracias por el servicio ",
		"FECHA_REGISTRO" : "22.10.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 131,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Sigue igual todoo",
		"FECHA_REGISTRO" : "22.10.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 132,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "22.10.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 133,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "22.10.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 134,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy bueno",
		"FECHA_REGISTRO" : "22.10.2025 10:35"
	},
	{
		"ID_CALIFICACION" : 137,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos y y redención de una parte que tenemos disponible ",
		"FECHA_REGISTRO" : "22.10.2025 11:41"
	},
	{
		"ID_CALIFICACION" : 138,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Cobren menos ",
		"FECHA_REGISTRO" : "22.10.2025 11:58"
	},
	{
		"ID_CALIFICACION" : 140,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que haya baños",
		"FECHA_REGISTRO" : "22.10.2025 12:03"
	},
	{
		"ID_CALIFICACION" : 141,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Agradecidos con la persona ",
		"FECHA_REGISTRO" : "22.10.2025 12:04"
	},
	{
		"ID_CALIFICACION" : 145,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "RECIBO DE PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "22.10.2025 12:10"
	},
	{
		"ID_CALIFICACION" : 149,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buena",
		"FECHA_REGISTRO" : "23.10.2025 09:12"
	},
	{
		"ID_CALIFICACION" : 153,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Agradecidos con el servicio ",
		"FECHA_REGISTRO" : "23.10.2025 09:20"
	},
	{
		"ID_CALIFICACION" : 154,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 2,
		"COMENTARIO" : "que tengas más transparente ",
		"FECHA_REGISTRO" : "23.10.2025 09:21"
	},
	{
		"ID_CALIFICACION" : 155,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "El servicio estq bien",
		"FECHA_REGISTRO" : "23.10.2025 09:29"
	},
	{
		"ID_CALIFICACION" : 156,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA DOCUMENTOS PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que sigan así o mejoren más ",
		"FECHA_REGISTRO" : "23.10.2025 09:30"
	},
	{
		"ID_CALIFICACION" : 158,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "23.10.2025 09:33"
	},
	{
		"ID_CALIFICACION" : 162,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo muy bien ",
		"FECHA_REGISTRO" : "23.10.2025 09:38"
	},
	{
		"ID_CALIFICACION" : 165,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 09:45"
	},
	{
		"ID_CALIFICACION" : 170,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:02"
	},
	{
		"ID_CALIFICACION" : 171,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:09"
	},
	{
		"ID_CALIFICACION" : 175,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "23.10.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 176,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 180,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "23.10.2025 10:38"
	},
	{
		"ID_CALIFICACION" : 181,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "23.10.2025 10:38"
	},
	{
		"ID_CALIFICACION" : 184,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "23.10.2025 10:42"
	},
	{
		"ID_CALIFICACION" : 187,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Tiene agilidad el servicio ",
		"FECHA_REGISTRO" : "23.10.2025 10:59"
	},
	{
		"ID_CALIFICACION" : 193,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Bien ",
		"FECHA_REGISTRO" : "23.10.2025 12:13"
	},
	{
		"ID_CALIFICACION" : 195,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA DE CHEQUE",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que sigan así de amables ",
		"FECHA_REGISTRO" : "23.10.2025 12:20"
	},
	{
		"ID_CALIFICACION" : 196,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 2,
		"COMENTARIO" : "Asesorar a más personas y no le dijeron solución ",
		"FECHA_REGISTRO" : "23.10.2025 12:28"
	},
	{
		"ID_CALIFICACION" : 197,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que aveces falla el espenet",
		"FECHA_REGISTRO" : "24.10.2025 09:20"
	},
	{
		"ID_CALIFICACION" : 198,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 1,
		"COMENTARIO" : "Muy mal y los intereses muy altos",
		"FECHA_REGISTRO" : "24.10.2025 09:21"
	},
	{
		"ID_CALIFICACION" : 200,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 09:35"
	},
	{
		"ID_CALIFICACION" : 201,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todod bien",
		"FECHA_REGISTRO" : "24.10.2025 09:38"
	},
	{
		"ID_CALIFICACION" : 202,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 204,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 09:45"
	},
	{
		"ID_CALIFICACION" : 205,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 09:48"
	},
	{
		"ID_CALIFICACION" : 211,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Mantenimiento al lugar ",
		"FECHA_REGISTRO" : "24.10.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 213,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 214,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "24.10.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 215,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:08"
	},
	{
		"ID_CALIFICACION" : 220,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Bien",
		"FECHA_REGISTRO" : "24.10.2025 10:21"
	},
	{
		"ID_CALIFICACION" : 223,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que no platiqué entre cajeras y presenten más atención y amabilidad ",
		"FECHA_REGISTRO" : "24.10.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 225,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:38"
	},
	{
		"ID_CALIFICACION" : 227,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Muy rápido ",
		"FECHA_REGISTRO" : "24.10.2025 10:43"
	},
	{
		"ID_CALIFICACION" : 230,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Esta solo esta bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:47"
	},
	{
		"ID_CALIFICACION" : 231,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 10:48"
	},
	{
		"ID_CALIFICACION" : 232,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 10:49"
	},
	{
		"ID_CALIFICACION" : 234,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 10:53"
	},
	{
		"ID_CALIFICACION" : 237,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "24.10.2025 11:03"
	},
	{
		"ID_CALIFICACION" : 239,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ya no dan saldo disponible como antes",
		"FECHA_REGISTRO" : "24.10.2025 11:23"
	},
	{
		"ID_CALIFICACION" : 244,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "SOLICITUD PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "24.10.2025 12:26"
	},
	{
		"ID_CALIFICACION" : 245,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Rápida ",
		"FECHA_REGISTRO" : "24.10.2025 12:33"
	},
	{
		"ID_CALIFICACION" : 247,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que sea más amable la persona ",
		"FECHA_REGISTRO" : "27.10.2025 09:38"
	},
	{
		"ID_CALIFICACION" : 254,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "27.10.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 268,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 09:35"
	},
	{
		"ID_CALIFICACION" : 271,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 09:43"
	},
	{
		"ID_CALIFICACION" : 277,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:18"
	},
	{
		"ID_CALIFICACION" : 284,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Alos pensionados referente a las prestaciones los tratan mal",
		"FECHA_REGISTRO" : "29.10.2025 10:34"
	},
	{
		"ID_CALIFICACION" : 286,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:40"
	},
	{
		"ID_CALIFICACION" : 289,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 10:55"
	},
	{
		"ID_CALIFICACION" : 291,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "29.10.2025 11:03"
	},
	{
		"ID_CALIFICACION" : 294,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Mucha irregularidades en los préstamos de corto plazo y no tienen derecho",
		"FECHA_REGISTRO" : "29.10.2025 11:39"
	},
	{
		"ID_CALIFICACION" : 296,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "29.10.2025 12:03"
	},
	{
		"ID_CALIFICACION" : 297,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 12:10"
	},
	{
		"ID_CALIFICACION" : 298,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "29.10.2025 12:14"
	},
	{
		"ID_CALIFICACION" : 300,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "29.10.2025 12:19"
	},
	{
		"ID_CALIFICACION" : 303,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "29.10.2025 12:24"
	},
	{
		"ID_CALIFICACION" : 305,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "30.10.2025 09:08"
	},
	{
		"ID_CALIFICACION" : 306,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que no les cobren el interés a los pensionados tan alto",
		"FECHA_REGISTRO" : "30.10.2025 09:09"
	},
	{
		"ID_CALIFICACION" : 308,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 09:18"
	},
	{
		"ID_CALIFICACION" : 309,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "REESTRUCTURA PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "30.10.2025 09:22"
	},
	{
		"ID_CALIFICACION" : 315,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 316,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 321,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "30.10.2025 09:45"
	},
	{
		"ID_CALIFICACION" : 322,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos aunque seamos del ISSSSPEA",
		"FECHA_REGISTRO" : "30.10.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 323,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "30.10.2025 09:49"
	},
	{
		"ID_CALIFICACION" : 324,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 09:52"
	},
	{
		"ID_CALIFICACION" : 325,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Ágilidad",
		"FECHA_REGISTRO" : "30.10.2025 09:55"
	},
	{
		"ID_CALIFICACION" : 328,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:02"
	},
	{
		"ID_CALIFICACION" : 330,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que sea más amable ",
		"FECHA_REGISTRO" : "30.10.2025 10:11"
	},
	{
		"ID_CALIFICACION" : 332,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:16"
	},
	{
		"ID_CALIFICACION" : 333,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Quitan en el préstamo mucho dinero ",
		"FECHA_REGISTRO" : "30.10.2025 10:20"
	},
	{
		"ID_CALIFICACION" : 334,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:22"
	},
	{
		"ID_CALIFICACION" : 336,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Cambio de letras ",
		"FECHA_REGISTRO" : "30.10.2025 10:24"
	},
	{
		"ID_CALIFICACION" : 337,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:26"
	},
	{
		"ID_CALIFICACION" : 338,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 339,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que no cobren tanto interés ",
		"FECHA_REGISTRO" : "30.10.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 341,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:33"
	},
	{
		"ID_CALIFICACION" : 343,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Prestación de los jubilados mejorarla",
		"FECHA_REGISTRO" : "30.10.2025 10:37"
	},
	{
		"ID_CALIFICACION" : 344,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:39"
	},
	{
		"ID_CALIFICACION" : 347,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "30.10.2025 10:50"
	},
	{
		"ID_CALIFICACION" : 348,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "30.10.2025 10:51"
	},
	{
		"ID_CALIFICACION" : 367,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Más amabilidad y hablen fuerte y sin prisa ",
		"FECHA_REGISTRO" : "30.10.2025 12:05"
	},
	{
		"ID_CALIFICACION" : 369,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bueno ",
		"FECHA_REGISTRO" : "30.10.2025 12:13"
	},
	{
		"ID_CALIFICACION" : 374,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 09:47"
	},
	{
		"ID_CALIFICACION" : 376,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos para adquirir un vehículo ",
		"FECHA_REGISTRO" : "31.10.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 378,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 10:17"
	},
	{
		"ID_CALIFICACION" : 385,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los montos hipotecarios son más altos ",
		"FECHA_REGISTRO" : "31.10.2025 11:57"
	},
	{
		"ID_CALIFICACION" : 386,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos ",
		"FECHA_REGISTRO" : "31.10.2025 12:09"
	},
	{
		"ID_CALIFICACION" : 387,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "REESTRUCTURA PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "No contestan ",
		"FECHA_REGISTRO" : "31.10.2025 12:11"
	},
	{
		"ID_CALIFICACION" : 391,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:21"
	},
	{
		"ID_CALIFICACION" : 392,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que bajen el interés ",
		"FECHA_REGISTRO" : "03.11.2025 09:23"
	},
	{
		"ID_CALIFICACION" : 393,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:24"
	},
	{
		"ID_CALIFICACION" : 399,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:38"
	},
	{
		"ID_CALIFICACION" : 402,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que a los jubilados los tengan más en cuenta ya que ellos son los que más n",
		"FECHA_REGISTRO" : "03.11.2025 09:52"
	},
	{
		"ID_CALIFICACION" : 404,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:56"
	},
	{
		"ID_CALIFICACION" : 405,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 407,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:03"
	},
	{
		"ID_CALIFICACION" : 408,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Líneas telefónicas que sean mejores (nunca atienden)",
		"FECHA_REGISTRO" : "03.11.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 409,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "03.11.2025 10:08"
	},
	{
		"ID_CALIFICACION" : 410,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:11"
	},
	{
		"ID_CALIFICACION" : 413,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bienb",
		"FECHA_REGISTRO" : "03.11.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 414,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 415,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 417,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que no quiten el interés antes ",
		"FECHA_REGISTRO" : "03.11.2025 10:33"
	},
	{
		"ID_CALIFICACION" : 424,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 12:20"
	},
	{
		"ID_CALIFICACION" : 428,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO HIPOTECARIO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 12:36"
	},
	{
		"ID_CALIFICACION" : 429,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "03.11.2025 12:39"
	},
	{
		"ID_CALIFICACION" : 430,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "04.11.2025 09:50"
	},
	{
		"ID_CALIFICACION" : 431,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses aumentaron, antes el Issspea era el más económico",
		"FECHA_REGISTRO" : "04.11.2025 10:40"
	},
	{
		"ID_CALIFICACION" : 433,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos para los pensionados ",
		"FECHA_REGISTRO" : "04.11.2025 11:07"
	},
	{
		"ID_CALIFICACION" : 434,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos en los créditos personales ",
		"FECHA_REGISTRO" : "04.11.2025 11:19"
	},
	{
		"ID_CALIFICACION" : 436,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Mucho tiempo en espera",
		"FECHA_REGISTRO" : "05.11.2025 09:59"
	},
	{
		"ID_CALIFICACION" : 439,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos ",
		"FECHA_REGISTRO" : "05.11.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 442,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "05.11.2025 10:48"
	},
	{
		"ID_CALIFICACION" : 444,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "07.11.2025 11:14"
	},
	{
		"ID_CALIFICACION" : 445,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Cobran los intereses por adelantado ",
		"FECHA_REGISTRO" : "07.11.2025 11:24"
	},
	{
		"ID_CALIFICACION" : 446,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Intereses muy altos para los pensionados es injusto!!!!",
		"FECHA_REGISTRO" : "07.11.2025 11:54"
	},
	{
		"ID_CALIFICACION" : 448,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Se desapareció mi capital y mis $100.000 ",
		"FECHA_REGISTRO" : "07.11.2025 12:02"
	},
	{
		"ID_CALIFICACION" : 451,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Entregan una carta mal con los datos mal y esto detiene mi tramite >à",
		"FECHA_REGISTRO" : "11.11.2025 09:54"
	},
	{
		"ID_CALIFICACION" : 452,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos, pedí $3000 y me entregaron $1000=\u0012",
		"FECHA_REGISTRO" : "11.11.2025 10:00"
	},
	{
		"ID_CALIFICACION" : 453,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien =\u0001",
		"FECHA_REGISTRO" : "11.11.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 455,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy buena=M<ü",
		"FECHA_REGISTRO" : "11.11.2025 10:19"
	},
	{
		"ID_CALIFICACION" : 456,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien!!",
		"FECHA_REGISTRO" : "11.11.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 457,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "RECIBO DE PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "11.11.2025 10:33"
	},
	{
		"ID_CALIFICACION" : 460,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA DE CHEQUE",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ningún problema ",
		"FECHA_REGISTRO" : "11.11.2025 11:27"
	},
	{
		"ID_CALIFICACION" : 461,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que la guardia sea más accesible ",
		"FECHA_REGISTRO" : "12.11.2025 09:23"
	},
	{
		"ID_CALIFICACION" : 463,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:28"
	},
	{
		"ID_CALIFICACION" : 464,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "12.11.2025 09:28"
	},
	{
		"ID_CALIFICACION" : 465,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:31"
	},
	{
		"ID_CALIFICACION" : 468,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 471,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo en orden>á",
		"FECHA_REGISTRO" : "12.11.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 475,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien >â",
		"FECHA_REGISTRO" : "12.11.2025 10:02"
	},
	{
		"ID_CALIFICACION" : 477,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que bajaran los intereses ",
		"FECHA_REGISTRO" : "12.11.2025 10:20"
	},
	{
		"ID_CALIFICACION" : 478,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 479,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "RECIBO DE PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "12.11.2025 10:32"
	},
	{
		"ID_CALIFICACION" : 482,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio =B",
		"FECHA_REGISTRO" : "12.11.2025 11:01"
	},
	{
		"ID_CALIFICACION" : 484,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio y me enamoro la cajera >)",
		"FECHA_REGISTRO" : "12.11.2025 11:10"
	},
	{
		"ID_CALIFICACION" : 485,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Excelente :\u000F",
		"FECHA_REGISTRO" : "12.11.2025 11:13"
	},
	{
		"ID_CALIFICACION" : 487,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy bien para mi que estoy pensionado=\u0008",
		"FECHA_REGISTRO" : "12.11.2025 11:21"
	},
	{
		"ID_CALIFICACION" : 493,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Siempre nos ayudan se lo agradezco >\u0017",
		"FECHA_REGISTRO" : "13.11.2025 09:51"
	},
	{
		"ID_CALIFICACION" : 497,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 10:00"
	},
	{
		"ID_CALIFICACION" : 498,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 10:03"
	},
	{
		"ID_CALIFICACION" : 501,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 502,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "A todos los pensionados les respeten su dinero ",
		"FECHA_REGISTRO" : "13.11.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 504,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 10:20"
	},
	{
		"ID_CALIFICACION" : 506,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 10:42"
	},
	{
		"ID_CALIFICACION" : 508,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "13.11.2025 11:03"
	},
	{
		"ID_CALIFICACION" : 509,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >x",
		"FECHA_REGISTRO" : "13.11.2025 11:07"
	},
	{
		"ID_CALIFICACION" : 512,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "13.11.2025 11:22"
	},
	{
		"ID_CALIFICACION" : 513,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Intereses muy altos= ",
		"FECHA_REGISTRO" : "13.11.2025 11:24"
	},
	{
		"ID_CALIFICACION" : 514,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente =\r",
		"FECHA_REGISTRO" : "13.11.2025 11:27"
	},
	{
		"ID_CALIFICACION" : 515,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos =?",
		"FECHA_REGISTRO" : "13.11.2025 11:31"
	},
	{
		"ID_CALIFICACION" : 516,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy servicio, me enamoro la cajera>p",
		"FECHA_REGISTRO" : "13.11.2025 11:36"
	},
	{
		"ID_CALIFICACION" : 517,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien =\u000E",
		"FECHA_REGISTRO" : "13.11.2025 11:39"
	},
	{
		"ID_CALIFICACION" : 518,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos por el auto $=J<û",
		"FECHA_REGISTRO" : "13.11.2025 11:41"
	},
	{
		"ID_CALIFICACION" : 519,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien se lo agradezco =B",
		"FECHA_REGISTRO" : "13.11.2025 11:49"
	},
	{
		"ID_CALIFICACION" : 520,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : ">\u0017 ningún problema ",
		"FECHA_REGISTRO" : "13.11.2025 11:54"
	},
	{
		"ID_CALIFICACION" : 522,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelentes contratos=\u000E",
		"FECHA_REGISTRO" : "13.11.2025 12:02"
	},
	{
		"ID_CALIFICACION" : 524,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente compra de mi auto>\u0019<û",
		"FECHA_REGISTRO" : "13.11.2025 12:08"
	},
	{
		"ID_CALIFICACION" : 526,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "13.11.2025 12:10"
	},
	{
		"ID_CALIFICACION" : 530,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 09:31"
	},
	{
		"ID_CALIFICACION" : 532,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 09:37"
	},
	{
		"ID_CALIFICACION" : 533,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que no cobraran tantos intereses ",
		"FECHA_REGISTRO" : "14.11.2025 09:40"
	},
	{
		"ID_CALIFICACION" : 534,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 09:43"
	},
	{
		"ID_CALIFICACION" : 538,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 541,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:23"
	},
	{
		"ID_CALIFICACION" : 542,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 543,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:40"
	},
	{
		"ID_CALIFICACION" : 544,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "SOLICITUD PENSIÓN",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:48"
	},
	{
		"ID_CALIFICACION" : 546,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:56"
	},
	{
		"ID_CALIFICACION" : 547,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "14.11.2025 10:58"
	},
	{
		"ID_CALIFICACION" : 552,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0017",
		"FECHA_REGISTRO" : "19.11.2025 09:31"
	},
	{
		"ID_CALIFICACION" : 553,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Excelente con mi préstamo para mi auto=\u000E",
		"FECHA_REGISTRO" : "19.11.2025 09:33"
	},
	{
		"ID_CALIFICACION" : 554,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "No dan intereses anuales después de ser pensionado=\u0014",
		"FECHA_REGISTRO" : "19.11.2025 09:35"
	},
	{
		"ID_CALIFICACION" : 555,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Como pensionados ya no me devuelven mis intereses >à",
		"FECHA_REGISTRO" : "19.11.2025 09:37"
	},
	{
		"ID_CALIFICACION" : 563,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos =N<ý",
		"FECHA_REGISTRO" : "19.11.2025 09:57"
	},
	{
		"ID_CALIFICACION" : 564,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Intereses muy altos incluso te lo cobran antes del préstamo >ä",
		"FECHA_REGISTRO" : "19.11.2025 10:00"
	},
	{
		"ID_CALIFICACION" : 568,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 3,
		"COMENTARIO" : "No aclaran todoss los requisitos para hacer un testamento.",
		"FECHA_REGISTRO" : "19.11.2025 10:21"
	},
	{
		"ID_CALIFICACION" : 570,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien>p",
		"FECHA_REGISTRO" : "19.11.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 571,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ningún problema =\u000E",
		"FECHA_REGISTRO" : "19.11.2025 11:28"
	},
	{
		"ID_CALIFICACION" : 572,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien>\u0019<û",
		"FECHA_REGISTRO" : "19.11.2025 11:29"
	},
	{
		"ID_CALIFICACION" : 573,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente >á",
		"FECHA_REGISTRO" : "19.11.2025 11:33"
	},
	{
		"ID_CALIFICACION" : 574,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien=\u0019",
		"FECHA_REGISTRO" : "19.11.2025 11:34"
	},
	{
		"ID_CALIFICACION" : 576,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PAGO DE PRÉSTAMO CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos $$$$",
		"FECHA_REGISTRO" : "19.11.2025 11:44"
	},
	{
		"ID_CALIFICACION" : 577,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\t=\t",
		"FECHA_REGISTRO" : "19.11.2025 11:45"
	},
	{
		"ID_CALIFICACION" : 579,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien>á",
		"FECHA_REGISTRO" : "19.11.2025 11:54"
	},
	{
		"ID_CALIFICACION" : 580,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien =\u0001",
		"FECHA_REGISTRO" : "19.11.2025 11:56"
	},
	{
		"ID_CALIFICACION" : 584,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "20.11.2025 09:32"
	},
	{
		"ID_CALIFICACION" : 585,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "20.11.2025 09:38"
	},
	{
		"ID_CALIFICACION" : 587,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo biekn",
		"FECHA_REGISTRO" : "20.11.2025 09:46"
	},
	{
		"ID_CALIFICACION" : 589,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien>á",
		"FECHA_REGISTRO" : "20.11.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 595,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos, es mi dinero y solo ISSSSPEA me cobra por darmelo>ä",
		"FECHA_REGISTRO" : "20.11.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 597,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos >(",
		"FECHA_REGISTRO" : "20.11.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 598,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u000E",
		"FECHA_REGISTRO" : "20.11.2025 10:23"
	},
	{
		"ID_CALIFICACION" : 599,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Que como van llegando atiendan ",
		"FECHA_REGISTRO" : "20.11.2025 10:25"
	},
	{
		"ID_CALIFICACION" : 600,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien ",
		"FECHA_REGISTRO" : "20.11.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 608,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Que contesten las llamadas que hacen desde su casa",
		"FECHA_REGISTRO" : "21.11.2025 09:34"
	},
	{
		"ID_CALIFICACION" : 609,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 09:36"
	},
	{
		"ID_CALIFICACION" : 624,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Hasta ahorita Todo bien =\u001A",
		"FECHA_REGISTRO" : "21.11.2025 10:15"
	},
	{
		"ID_CALIFICACION" : 625,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Hasta ahorita Todo bien =\u001A",
		"FECHA_REGISTRO" : "21.11.2025 10:15"
	},
	{
		"ID_CALIFICACION" : 628,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 10:23"
	},
	{
		"ID_CALIFICACION" : 629,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "RECIBO DE PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn",
		"FECHA_REGISTRO" : "21.11.2025 10:28"
	},
	{
		"ID_CALIFICACION" : 631,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 10:35"
	},
	{
		"ID_CALIFICACION" : 632,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 10:41"
	},
	{
		"ID_CALIFICACION" : 634,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 10:45"
	},
	{
		"ID_CALIFICACION" : 636,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 10:51"
	},
	{
		"ID_CALIFICACION" : 637,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "A los pensionados les hagan justicia ",
		"FECHA_REGISTRO" : "21.11.2025 10:58"
	},
	{
		"ID_CALIFICACION" : 639,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u000E",
		"FECHA_REGISTRO" : "21.11.2025 11:24"
	},
	{
		"ID_CALIFICACION" : 642,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien ",
		"FECHA_REGISTRO" : "21.11.2025 12:07"
	},
	{
		"ID_CALIFICACION" : 643,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "OTRO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Que se hiciera por línea todo para no venir hasta acá ",
		"FECHA_REGISTRO" : "21.11.2025 12:12"
	},
	{
		"ID_CALIFICACION" : 652,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA DE CHEQUE",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn=B",
		"FECHA_REGISTRO" : "24.11.2025 09:56"
	},
	{
		"ID_CALIFICACION" : 656,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA DE CHEQUE",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn=5\r=«",
		"FECHA_REGISTRO" : "24.11.2025 11:02"
	},
	{
		"ID_CALIFICACION" : 663,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=B",
		"FECHA_REGISTRO" : "25.11.2025 09:47"
	},
	{
		"ID_CALIFICACION" : 664,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente =\t",
		"FECHA_REGISTRO" : "25.11.2025 09:52"
	},
	{
		"ID_CALIFICACION" : 665,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien=\u0003",
		"FECHA_REGISTRO" : "25.11.2025 09:53"
	},
	{
		"ID_CALIFICACION" : 666,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente =6",
		"FECHA_REGISTRO" : "25.11.2025 09:55"
	},
	{
		"ID_CALIFICACION" : 667,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien agradecido con ISSSPEA",
		"FECHA_REGISTRO" : "25.11.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 668,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bien=\u0018",
		"FECHA_REGISTRO" : "25.11.2025 10:01"
	},
	{
		"ID_CALIFICACION" : 669,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien>\u0011",
		"FECHA_REGISTRO" : "25.11.2025 11:10"
	},
	{
		"ID_CALIFICACION" : 670,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos ",
		"FECHA_REGISTRO" : "25.11.2025 11:57"
	},
	{
		"ID_CALIFICACION" : 671,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente por ahora =\u0018",
		"FECHA_REGISTRO" : "26.11.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 673,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "26.11.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 674,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "ENTREGA CREDENCIAL PENSIONADO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muy bienn todo",
		"FECHA_REGISTRO" : "26.11.2025 10:10"
	},
	{
		"ID_CALIFICACION" : 677,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn",
		"FECHA_REGISTRO" : "26.11.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 678,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Buen servicio >\u0011",
		"FECHA_REGISTRO" : "26.11.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 679,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 3,
		"COMENTARIO" : "Los intereses muy altos para los pensionados 9\u000F",
		"FECHA_REGISTRO" : "26.11.2025 10:35"
	},
	{
		"ID_CALIFICACION" : 681,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente :\u000F",
		"FECHA_REGISTRO" : "26.11.2025 10:39"
	},
	{
		"ID_CALIFICACION" : 684,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente por aqui=B",
		"FECHA_REGISTRO" : "27.11.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 687,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >á",
		"FECHA_REGISTRO" : "01.12.2025 09:58"
	},
	{
		"ID_CALIFICACION" : 692,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0001",
		"FECHA_REGISTRO" : "01.12.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 693,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=\u0001",
		"FECHA_REGISTRO" : "01.12.2025 10:04"
	},
	{
		"ID_CALIFICACION" : 694,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN ISSSSPENET",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo esta bien=B",
		"FECHA_REGISTRO" : "01.12.2025 10:06"
	},
	{
		"ID_CALIFICACION" : 695,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ah los pensionados, poco intereses para los pensionados >r",
		"FECHA_REGISTRO" : "01.12.2025 10:10"
	},
	{
		"ID_CALIFICACION" : 696,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo esta muy bien =\u0004",
		"FECHA_REGISTRO" : "01.12.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 700,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "01.12.2025 10:38"
	},
	{
		"ID_CALIFICACION" : 701,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien=6",
		"FECHA_REGISTRO" : "01.12.2025 10:41"
	},
	{
		"ID_CALIFICACION" : 702,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos =\u0017",
		"FECHA_REGISTRO" : "01.12.2025 10:42"
	},
	{
		"ID_CALIFICACION" : 703,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Los intereses muy altos no se pasen >à=\u0012",
		"FECHA_REGISTRO" : "01.12.2025 10:45"
	},
	{
		"ID_CALIFICACION" : 708,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "En desacuerdo con los registros de la entrada!! ",
		"FECHA_REGISTRO" : "02.12.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 711,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente pero chingao quiten el  registro",
		"FECHA_REGISTRO" : "02.12.2025 10:14"
	},
	{
		"ID_CALIFICACION" : 715,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >p",
		"FECHA_REGISTRO" : "02.12.2025 10:29"
	},
	{
		"ID_CALIFICACION" : 716,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN PRÓXIMA PENSIÓN",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Ya no nos dan los mismos intereses a los pensionados =\u0012",
		"FECHA_REGISTRO" : "02.12.2025 10:32"
	},
	{
		"ID_CALIFICACION" : 717,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bien",
		"FECHA_REGISTRO" : "02.12.2025 10:34"
	},
	{
		"ID_CALIFICACION" : 720,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >\u0017",
		"FECHA_REGISTRO" : "02.12.2025 10:40"
	},
	{
		"ID_CALIFICACION" : 721,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente!!",
		"FECHA_REGISTRO" : "02.12.2025 10:42"
	},
	{
		"ID_CALIFICACION" : 722,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "El registro es innecesario >à",
		"FECHA_REGISTRO" : "02.12.2025 10:45"
	},
	{
		"ID_CALIFICACION" : 723,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos >(",
		"FECHA_REGISTRO" : "02.12.2025 10:48"
	},
	{
		"ID_CALIFICACION" : 724,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente servicio =\u001A",
		"FECHA_REGISTRO" : "02.12.2025 11:05"
	},
	{
		"ID_CALIFICACION" : 731,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Me jodieron con un interés de $400 con mi préstamo de $1,600",
		"FECHA_REGISTRO" : "03.12.2025 10:17"
	},
	{
		"ID_CALIFICACION" : 733,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "03.12.2025 10:27"
	},
	{
		"ID_CALIFICACION" : 734,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente =\r",
		"FECHA_REGISTRO" : "03.12.2025 10:30"
	},
	{
		"ID_CALIFICACION" : 735,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 3,
		"COMENTARIO" : "No me resuelven el aguinaldo =\u0012",
		"FECHA_REGISTRO" : "03.12.2025 10:34"
	},
	{
		"ID_CALIFICACION" : 736,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Graciass",
		"FECHA_REGISTRO" : "03.12.2025 10:35"
	},
	{
		"ID_CALIFICACION" : 737,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CAMBIO CUENTA BANCARIA",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente >ä",
		"FECHA_REGISTRO" : "03.12.2025 12:13"
	},
	{
		"ID_CALIFICACION" : 738,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente!!",
		"FECHA_REGISTRO" : "03.12.2025 12:24"
	},
	{
		"ID_CALIFICACION" : 739,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo excelente ",
		"FECHA_REGISTRO" : "08.12.2025 10:03"
	},
	{
		"ID_CALIFICACION" : 740,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Todo bien=\u0001",
		"FECHA_REGISTRO" : "08.12.2025 10:05"
	},
	{
		"ID_CALIFICACION" : 742,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos >\u0012",
		"FECHA_REGISTRO" : "08.12.2025 10:07"
	},
	{
		"ID_CALIFICACION" : 743,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo excelente!!",
		"FECHA_REGISTRO" : "08.12.2025 10:12"
	},
	{
		"ID_CALIFICACION" : 745,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Esta muy bien todo!!",
		"FECHA_REGISTRO" : "08.12.2025 10:24"
	},
	{
		"ID_CALIFICACION" : 746,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "INFORMACIÓN ISSSSPENET",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo muy bienn",
		"FECHA_REGISTRO" : "08.12.2025 10:26"
	},
	{
		"ID_CALIFICACION" : 747,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Todo bienn ",
		"FECHA_REGISTRO" : "08.12.2025 11:48"
	},
	{
		"ID_CALIFICACION" : 748,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 4,
		"COMENTARIO" : "Intereses muy altos padrino ",
		"FECHA_REGISTRO" : "08.12.2025 11:55"
	},
	{
		"ID_CALIFICACION" : 749,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "CITA PERSONAL",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Intereses muy altos =N<û",
		"FECHA_REGISTRO" : "08.12.2025 11:56"
	},
	{
		"ID_CALIFICACION" : 750,
		"NOMBRE" : "OTRO",
		"PUESTO" : null,
		"URL" : "https:\/\/app.isssspenet.gob.mx\/tablets\/otro_o_null.webp",
		"SERVICIO" : "COTIZACIÓN PRÉSTAMO DE CORTO PLAZO",
		"CALIFICACION" : 5,
		"COMENTARIO" : "Muchas gracias >p",
		"FECHA_REGISTRO" : "08.12.2025 11:59"
	}
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const SATISFACTION_COLORS = {
  5: '#10B981', // Verde
  4: '#3B82F6', // Azul
  3: '#F59E0B', // Amarillo
  2: '#F97316', // Naranja
  1: '#EF4444'  // Rojo
};

// Función auxiliar para convertir fecha "DD.MM.YYYY HH:mm" a objeto Date
const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('.');
  // const [hour, minute] = timePart.split(':'); // Opcional si necesitamos hora exacta
  return new Date(`${year}-${month}-${day}`);
};

// --- COMPONENTE DE TOOLTIP PERSONALIZADO ---
const CustomAvatarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl z-50 min-w-[220px]">
        <div className="flex flex-col items-center">
          {data.avatar ? (
             <img 
               src={data.avatar} 
               alt={data.name} 
               className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-md mb-3"
               onError={(e) => {
                 e.target.onerror = null; 
                 e.target.src = "https://ui-avatars.com/api/?name=" + data.name + "&background=random";
               }}
             />
          ) : (
             <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-gray-400 border-4 border-gray-50">
               <Users size={40} />
             </div>
          )}
          <p className="font-bold text-gray-800 text-center text-sm mb-1 px-2 leading-tight">{data.fullName}</p>
          <span className="text-[10px] text-gray-400 mb-3 uppercase tracking-wider font-semibold">Reporte Individual</span>
          
          <div className="w-full space-y-2 text-xs bg-gray-50 p-3 rounded-lg">
             <div className="flex justify-between items-center text-gray-600 border-b border-gray-100 pb-1">
               <span>Promedio:</span>
               <div className="flex items-center gap-1">
                 <span className={`font-bold text-sm ${data.Promedio >= 4.5 ? 'text-green-600' : data.Promedio >= 4 ? 'text-blue-600' : 'text-red-500'}`}>
                   {data.Promedio}
                 </span>
                 <Star size={10} className="fill-current text-yellow-400" />
               </div>
             </div>
             <div className="flex justify-between items-center text-gray-600 border-b border-gray-100 pb-1">
               <span>Total Atenciones:</span>
               <span className="font-bold text-gray-800">{data.Atenciones}</span>
             </div>
             <div className="flex justify-between items-center text-gray-600">
               <span>Excelencia (5★):</span>
               <span className="font-bold text-gray-800">{data.Efectividad}%</span>
             </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// --- COMPONENTE TARJETA DE EMPLEADO ---
const EmployeeCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 relative">
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
           <img 
             src={data.avatar} 
             alt={data.fullName}
             className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-white"
             onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://ui-avatars.com/api/?name=" + data.fullName + "&background=random";
             }}
           />
        </div>
      </div>
      <div className="pt-12 pb-6 px-6 flex-grow text-center">
        <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
          {data.fullName}
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-4">
          {data.puesto || "Personal General / Kiosco"}
        </p>
        
        <div className="grid grid-cols-3 gap-2 border-t border-gray-50 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">Promedio</span>
            <div className="flex items-center gap-1 font-bold text-gray-800">
               <span className={data.Promedio >= 4.5 ? "text-green-600" : "text-blue-600"}>{data.Promedio}</span>
               <Star size={12} className="fill-yellow-400 text-yellow-400"/>
            </div>
          </div>
          <div className="flex flex-col items-center border-l border-gray-100">
             <span className="text-xs text-gray-400 mb-1">Atenciones</span>
             <span className="font-bold text-gray-800">{data.Atenciones}</span>
          </div>
          <div className="flex flex-col items-center border-l border-gray-100">
             <span className="text-xs text-gray-400 mb-1">Excelencia</span>
             <span className="font-bold text-green-600">{data.Efectividad}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardReporte() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para menú móvil

  // --- ESTADOS PARA FILTROS Y ORDENAMIENTO ---
  const [filterService, setFilterService] = useState('Todos');
  const [filterRating, setFilterRating] = useState('Todos');
  const [filterPersonal, setFilterPersonal] = useState('Todos');
  const [sortConfig, setSortConfig] = useState({ key: 'FECHA_REGISTRO', direction: 'desc' });
  
  // Nuevo estado para la visibilidad de los servicios en la gráfica
  // Se inicializa vacío para que el usuario seleccione manualmente
  const [visibleServices, setVisibleServices] = useState([]);

  // --- PROCESAMIENTO DE DATOS ---
  
  // 1. KPIs Generales
  const kpis = useMemo(() => {
    const total = RAW_DATA.length;
    const promedio = RAW_DATA.reduce((acc, curr) => acc + curr.CALIFICACION, 0) / total;
    const promoters = RAW_DATA.filter(d => d.CALIFICACION === 5).length;
    const detractors = RAW_DATA.filter(d => d.CALIFICACION <= 3).length;
    const nps = ((promoters - detractors) / total) * 100;
    
    return {
      total,
      promedio: promedio.toFixed(1),
      nps: Math.round(nps),
      satisfaccion5: Math.round((promoters / total) * 100)
    };
  }, []);

  // 2. Distribución de Calificaciones (Pie Chart)
  const distCalificaciones = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    RAW_DATA.forEach(d => counts[d.CALIFICACION] = (counts[d.CALIFICACION] || 0) + 1);
    return Object.keys(counts).map(k => ({
      name: `${k} Estrellas`,
      value: counts[k],
      rawKey: parseInt(k)
    })).filter(item => item.value > 0);
  }, []);

  // 3. Desempeño por Empleado (Bar Chart + Line + Cards)
  const dataEmpleados = useMemo(() => {
    const grouped = {};
    RAW_DATA.forEach(d => {
      const name = d.NOMBRE === "OTRO" ? "OTRO" : d.NOMBRE.split(" ")[0] + " " + d.NOMBRE.split(" ")[1];
      const avatarUrl = d.URL; 
      
      if (!grouped[name]) grouped[name] = { 
        name, 
        total: 0, 
        sum: 0, 
        count5: 0, 
        avatar: avatarUrl, 
        fullName: d.NOMBRE,
        puesto: d.PUESTO 
      };
      
      grouped[name].total += 1;
      grouped[name].sum += d.CALIFICACION;
      if (d.CALIFICACION === 5) grouped[name].count5 += 1;
    });
    
    return Object.values(grouped).map(g => ({
      name: g.name,
      fullName: g.fullName,
      puesto: g.puesto,
      avatar: g.avatar,
      Promedio: parseFloat((g.sum / g.total).toFixed(2)),
      Atenciones: g.total,
      Efectividad: Math.round((g.count5 / g.total) * 100)
    })).sort((a, b) => b.Promedio - a.Promedio);
  }, []);

  // 4. Análisis por Servicio (Bar Chart) - DATOS COMPLETOS
  const dataServiciosCompleta = useMemo(() => {
    const grouped = {};
    RAW_DATA.forEach(d => {
      if (!grouped[d.SERVICIO]) grouped[d.SERVICIO] = { name: d.SERVICIO, total: 0, sum: 0 };
      grouped[d.SERVICIO].total += 1;
      grouped[d.SERVICIO].sum += d.CALIFICACION;
    });
    return Object.values(grouped).map(g => ({
      name: g.name,
      Promedio: parseFloat((g.sum / g.total).toFixed(2)),
      Volumen: g.total
    })).sort((a, b) => b.Volumen - a.Volumen);
  }, []);

  // 4.1 Datos Filtrados para la Gráfica
  const dataServiciosFiltrada = useMemo(() => {
    return dataServiciosCompleta.filter(s => visibleServices.includes(s.name));
  }, [dataServiciosCompleta, visibleServices]);

  // Handler para alternar visibilidad
  const toggleServiceVisibility = (serviceName) => {
    setVisibleServices(prev => 
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName) // Ocultar
        : [...prev, serviceName] // Mostrar
    );
  };

  // 5. Evolución Temporal (Area Chart)
  const dataTiempo = useMemo(() => {
    const grouped = {};
    RAW_DATA.forEach(d => {
      const dateObj = parseDate(d.FECHA_REGISTRO);
      const dateKey = dateObj.toISOString().split('T')[0];

      if (!grouped[dateKey]) grouped[dateKey] = { date: dateKey, count: 0, sum: 0, displayDate: d.FECHA_REGISTRO.split(' ')[0] };
      grouped[dateKey].count += 1;
      grouped[dateKey].sum += d.CALIFICACION;
    });
    
    return Object.values(grouped)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(g => ({
        date: g.displayDate,
        sortDate: g.date,
        Calidad: parseFloat((g.sum / g.count).toFixed(2)),
        Volumen: g.count
      }));
  }, []);

  // --- LOGICA DE FILTRADO Y ORDENAMIENTO (TABLA COMENTARIOS) ---
  const uniqueServices = useMemo(() => ['Todos', ...new Set(RAW_DATA.map(d => d.SERVICIO).filter(Boolean))].sort(), []);
  const uniquePersonal = useMemo(() => ['Todos', ...new Set(RAW_DATA.map(d => d.NOMBRE).filter(Boolean))].sort(), []);
  
  const processedComments = useMemo(() => {
    let data = [...RAW_DATA];

    if (filterService !== 'Todos') data = data.filter(item => item.SERVICIO === filterService);
    if (filterRating !== 'Todos') data = data.filter(item => item.CALIFICACION.toString() === filterRating);
    if (filterPersonal !== 'Todos') data = data.filter(item => item.NOMBRE === filterPersonal);

    data.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (sortConfig.key === 'FECHA_REGISTRO') { aValue = parseDate(a.FECHA_REGISTRO); bValue = parseDate(b.FECHA_REGISTRO); }
      if (sortConfig.key === 'NOMBRE') { aValue = a.NOMBRE; bValue = b.NOMBRE; }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [filterService, filterRating, filterPersonal, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <div className="w-4 h-4 ml-1 opacity-20"><ArrowUpRight size={14}/></div>;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="ml-1 text-blue-600"/> : <ChevronDown size={14} className="ml-1 text-blue-600"/>;
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setFilterService('Todos');
    setFilterRating('Todos');
    setFilterPersonal('Todos');
  };

  const hasActiveFilters = filterService !== 'Todos' || filterRating !== 'Todos' || filterPersonal !== 'Todos';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header RESPONSIVO */}
      <header className="bg-white shadow-sm sticky top-0 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reporte de Calidad</h1>
              <p className="text-xs text-gray-500">Tablets de Satisfacción • Oct-Dic 2025</p>
            </div>
          </div>
          
          {/* Navegación Desktop */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('personal')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'personal' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Personal
            </button>
            <button 
              onClick={() => setActiveTab('comments')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'comments' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Comentarios
            </button>
          </div>

          {/* Botón Menú Móvil */}
          <button 
             className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú Desplegable Móvil */}
        {isMobileMenuOpen && (
           <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-lg z-20 px-4 py-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
              <button 
                onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-3 rounded-md text-sm font-medium text-left transition-colors flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button 
                onClick={() => { setActiveTab('personal'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-3 rounded-md text-sm font-medium text-left transition-colors flex items-center gap-3 ${activeTab === 'personal' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <BadgeCheck size={18} /> Personal
              </button>
              <button 
                onClick={() => { setActiveTab('comments'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-3 rounded-md text-sm font-medium text-left transition-colors flex items-center gap-3 ${activeTab === 'comments' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <MessageSquare size={18} /> Comentarios
              </button>
           </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- PESTAÑA DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard 
                title="Calificación Promedio" 
                value={kpis.promedio} 
                subtext="Escala de 1 a 5" 
                icon={<Star className="text-yellow-500" />} 
                trend="positive"
              />
              <KpiCard 
                title="Total Encuestas" 
                value={kpis.total} 
                subtext="Registros procesados" 
                icon={<FileText className="text-blue-500" />} 
              />
              <KpiCard 
                title="NPS Estimado" 
                value={kpis.nps} 
                subtext="% Promotores - % Detractores" 
                icon={<TrendingUp className="text-purple-500" />} 
                trend={kpis.nps > 50 ? "positive" : "neutral"}
              />
              <KpiCard 
                title="Tasa de Excelencia" 
                value={`${kpis.satisfaccion5}%`} 
                subtext="Calificaciones de 5 estrellas" 
                icon={<Users className="text-green-500" />} 
                trend="positive"
              />
            </div>

            {/* Fila 1: Distribución y Evolución */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Distribución de Estrellas */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <PieChart size={18} className="text-gray-400"/> Distribución de Satisfacción
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distCalificaciones}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {distCalificaciones.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={SATISFACTION_COLORS[entry.rawKey]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    La mayoría de los usuarios califican con 
                    <span className="font-bold text-gray-800"> {[...distCalificaciones].sort((a,b) => b.value - a.value)[0]?.name}</span>.
                  </p>
                </div>
              </div>

              {/* Tendencia Temporal */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-gray-400"/> Evolución de Calidad y Volumen
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={dataTiempo}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                      <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#9CA3AF"/>
                      <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" label={{ value: 'Volumen', angle: -90, position: 'insideLeft' }}/>
                      <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={[0, 5]} hide/>
                      <RechartsTooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="Volumen" barSize={20} fill="#BFDBFE" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="Calidad" stroke="#10B981" strokeWidth={3} dot={{r: 4}} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Fila 2: Análisis por Personal y Servicios */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Desempeño por Personal */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Users size={18} className="text-gray-400"/> Desempeño por Personal
                  </h3>
                  {/* Avatar del mejor empleado */}
                  {dataEmpleados[0]?.avatar && (
                     <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                       <span className="text-xs font-bold text-green-700">Mejor Calif:</span>
                       <img 
                          src={dataEmpleados[0].avatar} 
                          alt="Top Employee" 
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                       />
                       <span className="text-xs text-gray-700 font-medium truncate max-w-[100px]">{dataEmpleados[0].name}</span>
                     </div>
                  )}
                </div>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={dataEmpleados}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 5]} hide />
                      <YAxis dataKey="name" type="category" width={140} tick={{fontSize: 11}} />
                      {/* TOOLTIP PERSONALIZADO ACTIVADO AQUI */}
                      <RechartsTooltip content={<CustomAvatarTooltip />} cursor={{fill: 'rgba(59, 130, 246, 0.1)'}} />
                      <Legend />
                      <Bar dataKey="Promedio" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} name="Calif. Promedio">
                         {
                            dataEmpleados.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.Promedio >= 4.5 ? '#10B981' : entry.Promedio >= 4 ? '#3B82F6' : '#EF4444'} />
                            ))
                          }
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Volumen y Calidad por Servicio */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Filter size={18} className="text-gray-400"/> Análisis por Tipo de Servicio
                </h3>
                
                {/* 1. CONTENEDOR DE GRÁFICA (Altura Fija) */}
                <div className="h-72 w-full mb-4">
                  {dataServiciosFiltrada.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dataServiciosFiltrada}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={false} /> 
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 6]} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="Volumen" fill="#8884d8" name="Total Atenciones" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="Promedio" fill="#82ca9d" name="Calif. Promedio" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                      <Filter size={32} className="mb-2 opacity-20"/>
                      <p>Selecciona un servicio abajo para visualizar</p>
                    </div>
                  )}
                </div>

                {/* 2. CONTENEDOR DE MIGAJAS (Altura flexible con scroll si es necesario) */}
                <div className="mt-2 text-xs text-gray-500 text-center flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto px-2 py-2 border-t border-gray-50">
                    {dataServiciosCompleta.map((s, i) => {
                      const isActive = visibleServices.includes(s.name);
                      return (
                        <button
                          key={i}
                          onClick={() => toggleServiceVisibility(s.name)}
                          className={`px-3 py-1 rounded-full border transition-all duration-200 flex items-center gap-1 ${
                            isActive 
                              ? 'bg-blue-100 text-blue-800 border-blue-200 font-medium shadow-sm' 
                              : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'
                          }`}
                        >
                          {isActive ? <Eye size={10}/> : <EyeOff size={10}/>}
                          {s.name}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- PESTAÑA PERSONAL --- */}
        {activeTab === 'personal' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <BadgeCheck className="text-blue-600" /> Directorio de Personal y Desempeño
               </h2>
               <p className="text-sm text-gray-500 mt-1">
                 Resumen individualizado del rendimiento para cada miembro del equipo.
               </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dataEmpleados.map((emp) => (
                <EmployeeCard key={emp.name} data={emp} />
              ))}
            </div>
          </div>
        )}

        {/* --- PESTAÑA COMENTARIOS --- */}
        {activeTab === 'comments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px] animate-in fade-in duration-300">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare size={18} className="text-gray-400"/> Explorador de Comentarios
                </h3>

                {/* BOTÓN REINICIAR FILTROS */}
                {hasActiveFilters && (
                  <button 
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <RotateCcw size={14} />
                    Limpiar filtros
                  </button>
                )}
             </div>
                
             {/* BARRA DE FILTROS */}
             <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  
                  {/* Filtro Personal */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Personal</label>
                    <div className="relative">
                      <Users size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                      <select 
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-700"
                        value={filterPersonal}
                        onChange={(e) => setFilterPersonal(e.target.value)}
                      >
                        {uniquePersonal.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                  </div>

                  {/* Filtro Servicio */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Servicio</label>
                    <div className="relative">
                      <Filter size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                      <select 
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-700"
                        value={filterService}
                        onChange={(e) => setFilterService(e.target.value)}
                      >
                        {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                       <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                  </div>

                  {/* Filtro Calificación */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Calificación</label>
                    <div className="relative">
                      <Star size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                      <select 
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-700"
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                      >
                        <option value="Todos">Todas las estrellas</option>
                        <option value="5">5 Estrellas (Excelente)</option>
                        <option value="4">4 Estrellas (Bueno)</option>
                        <option value="3">3 Estrellas (Regular)</option>
                        <option value="2">2 Estrellas (Malo)</option>
                        <option value="1">1 Estrella (Pésimo)</option>
                      </select>
                       <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                  </div>

                </div>
             </div>
             
             {/* TABLA DE RESULTADOS */}
             <div className="overflow-x-auto flex-grow">
               <table className="w-full text-left text-sm text-gray-600">
                 <thead className="bg-gray-50 text-gray-900 font-semibold sticky top-0 z-10 shadow-sm">
                   <tr>
                     <th 
                       className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors select-none"
                       onClick={() => handleSort('NOMBRE')}
                     >
                       <div className="flex items-center">Personal {getSortIcon('NOMBRE')}</div>
                     </th>
                     <th 
                       className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors select-none"
                       onClick={() => handleSort('FECHA_REGISTRO')}
                     >
                       <div className="flex items-center">Fecha {getSortIcon('FECHA_REGISTRO')}</div>
                     </th>
                     <th 
                       className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors select-none"
                       onClick={() => handleSort('SERVICIO')}
                     >
                        <div className="flex items-center">Servicio {getSortIcon('SERVICIO')}</div>
                     </th>
                     <th 
                       className="px-6 py-4 text-center cursor-pointer hover:bg-gray-100 transition-colors select-none"
                       onClick={() => handleSort('CALIFICACION')}
                     >
                        <div className="flex items-center justify-center">Calif. {getSortIcon('CALIFICACION')}</div>
                     </th>
                     <th className="px-6 py-4">Comentario</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {processedComments.length > 0 ? (
                     processedComments.map((row) => (
                       <tr key={row.ID_CALIFICACION} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300">
                               <img 
                                 src={row.URL} 
                                 alt={row.NOMBRE}
                                 className="h-full w-full object-cover"
                                 onError={(e) => {e.target.style.display = 'none'; e.target.parentNode.style.backgroundColor = '#e5e7eb';}}
                               />
                             </div>
                             <div className="flex flex-col">
                               <span className="font-medium text-gray-900 text-xs">
                                 {row.NOMBRE === "OTRO" ? "OTRO" : row.NOMBRE}
                               </span>
                               <span className="text-[10px] text-gray-500">{row.PUESTO || "N/A"}</span>
                             </div>
                           </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-xs">{row.FECHA_REGISTRO}</td>
                         <td className="px-6 py-4 text-xs">{row.SERVICIO}</td>
                         <td className="px-6 py-4 text-center">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                             row.CALIFICACION === 5 ? 'bg-green-100 text-green-700' :
                             row.CALIFICACION >= 4 ? 'bg-blue-100 text-blue-700' :
                             'bg-red-100 text-red-700'
                           }`}>
                             {row.CALIFICACION} ★
                           </span>
                         </td>
                         <td className="px-6 py-4 text-gray-700 max-w-xs text-xs font-medium italic relative group cursor-pointer">
                           <div className="truncate">"{row.COMENTARIO}"</div>
                           {/* Hover Tooltip con el comentario completo */}
                           <div className="absolute left-0 bottom-full mb-2 w-64 bg-gray-800 text-white text-xs p-3 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                              {row.COMENTARIO}
                              {/* Flechita del tooltip */}
                              <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                           </div>
                         </td>
                       </tr>
                     ))
                   ) : (
                     <tr>
                       <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                         <div className="flex flex-col items-center">
                           <Search size={32} className="mb-2 opacity-50"/>
                           <p>No se encontraron comentarios con estos filtros.</p>
                           <button 
                             onClick={resetFilters}
                             className="mt-2 text-blue-600 text-xs font-bold hover:underline"
                           >
                             Limpiar filtros
                           </button>
                         </div>
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
             
             {/* Footer con contador */}
             <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
               <span>Mostrando {processedComments.length} de {RAW_DATA.length} registros</span>
               <div className="flex gap-4">
                  {filterService !== 'Todos' && <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Servicio: {filterService}</span>}
                  {filterRating !== 'Todos' && <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Calif: {filterRating}★</span>}
               </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Componente auxiliar para Tarjetas KPI
function KpiCard({ title, value, subtext, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        <p className="text-xs text-gray-400 mt-1">{subtext}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="p-3 bg-gray-50 rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-bold ${trend === 'positive' ? 'text-green-600' : 'text-gray-400'}`}>
            {trend === 'positive' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
            {trend === 'positive' ? 'Excelente' : 'Estable'}
          </div>
        )}
      </div>
    </div>
  );
}