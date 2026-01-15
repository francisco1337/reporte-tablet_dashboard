'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Upload, FileText, DollarSign, TrendingUp, Users, Calendar, 
  Activity, PieChart as PieIcon, ShieldCheck, Download, Search, ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';

// Datos de ejemplo completos con todas las columnas del archivo
const SAMPLE_DATA = [
  { INTERNO: "84358", NO_PRESTAMO: "3", CLAVE_ORGANICA_0: "04", CLAVE_ORGANICA_1: "24", CLAVE_ORGANICA_2: "01", CLAVE_ORGANICA_3: "01", CAPITAL: "52000", PLAZO: "55", FSOLICITUD: "2025-12-05", FOTORGAMIENTO: "2025-12-05", STATUS: "A", SEGURO: "317.92", TOTAL_RESPALDO_SEG: "51992.1", FECHA_INICIO: "2026-04-30", FECHA_FIN: "2028-07-31" },
  { INTERNO: "63939", NO_PRESTAMO: "123", CLAVE_ORGANICA_0: "04", CLAVE_ORGANICA_1: "24", CLAVE_ORGANICA_2: "01", CLAVE_ORGANICA_3: "01", CAPITAL: "50000", PLAZO: "50", FSOLICITUD: "2025-12-05", FOTORGAMIENTO: "2025-12-05", STATUS: "A", SEGURO: "277.31", TOTAL_RESPALDO_SEG: "50000", FECHA_INICIO: "2026-07-31", FECHA_FIN: "2028-08-15" },
  { INTERNO: "41522", NO_PRESTAMO: "20", CLAVE_ORGANICA_0: "01", CLAVE_ORGANICA_1: "04", CLAVE_ORGANICA_2: "01", CLAVE_ORGANICA_3: "01", CAPITAL: "61910", PLAZO: "50", FSOLICITUD: "2025-12-08", FOTORGAMIENTO: "2025-12-08", STATUS: "A", SEGURO: "342.25", TOTAL_RESPALDO_SEG: "61800.2", FECHA_INICIO: "2026-11-15", FECHA_FIN: "2028-11-30" },
  { INTERNO: "61690", NO_PRESTAMO: "200", CLAVE_ORGANICA_0: "02", CLAVE_ORGANICA_1: "06", CLAVE_ORGANICA_2: "04", CLAVE_ORGANICA_3: "03", CAPITAL: "23000", PLAZO: "24", FSOLICITUD: "2026-01-13", FOTORGAMIENTO: "2026-01-13", STATUS: "A", SEGURO: "120.50", TOTAL_RESPALDO_SEG: "23000", FECHA_INICIO: "2026-11-30", FECHA_FIN: "2027-04-15" },
  { INTERNO: "15638", NO_PRESTAMO: "256", CLAVE_ORGANICA_0: "04", CLAVE_ORGANICA_1: "04", CLAVE_ORGANICA_2: "60", CLAVE_ORGANICA_3: "47", CAPITAL: "12000", PLAZO: "11", FSOLICITUD: "2026-01-13", FOTORGAMIENTO: "2026-01-13", STATUS: "A", SEGURO: "163.92", TOTAL_RESPALDO_SEG: "12000", FECHA_INICIO: "2028-08-15", FECHA_FIN: "2029-01-15" },
  { INTERNO: "61872", NO_PRESTAMO: "41", CLAVE_ORGANICA_0: "01", CLAVE_ORGANICA_1: "24", CLAVE_ORGANICA_2: "00", CLAVE_ORGANICA_3: "00", CAPITAL: "52000", PLAZO: "40", FSOLICITUD: "2026-01-13", FOTORGAMIENTO: "2026-01-13", STATUS: "A", SEGURO: "563.17", TOTAL_RESPALDO_SEG: "51853.7", FECHA_INICIO: "2027-05-15", FECHA_FIN: "2028-12-31" },
  { INTERNO: "81151", NO_PRESTAMO: "5", CLAVE_ORGANICA_0: "01", CLAVE_ORGANICA_1: "07", CLAVE_ORGANICA_2: "06", CLAVE_ORGANICA_3: "00", CAPITAL: "52000", PLAZO: "40", FSOLICITUD: "2026-01-14", FOTORGAMIENTO: "2026-01-14", STATUS: "A", SEGURO: "468.33", TOTAL_RESPALDO_SEG: "44652.9", FECHA_INICIO: "2027-05-31", FECHA_FIN: "2029-01-15" },
  { INTERNO: "42209", NO_PRESTAMO: "227", CLAVE_ORGANICA_0: "01", CLAVE_ORGANICA_1: "20", CLAVE_ORGANICA_2: "03", CLAVE_ORGANICA_3: "00", CAPITAL: "35000", PLAZO: "41", FSOLICITUD: "2026-01-14", FOTORGAMIENTO: "2026-01-14", STATUS: "A", SEGURO: "210.00", TOTAL_RESPALDO_SEG: "35000", FECHA_INICIO: "2026-02-15", FECHA_FIN: "2029-02-28" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Card componente simplificado sin 'trend'
const Card = ({ title, value, subtext, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
  </div>
);

const DashboardPage = () => {
  const [data, setData] = useState(SAMPLE_DATA);
  const [fileName, setFileName] = useState("Datos de Muestra (Carga tu CSV)");
  
  // Estados para tabla interactiva
  const [filterText, setFilterText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Procesar CSV cargado
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n').map(row => row.split(','));
        const headers = rows[0].map(h => h.trim());
        
        const parsedData = rows.slice(1).filter(row => row.length === headers.length).map(row => {
          const obj = {};
          headers.forEach((header, i) => {
            obj[header] = row[i]?.trim();
          });
          return obj;
        });
        setData(parsedData);
      };
      reader.readAsText(file);
    }
  };

  // Cálculos de Estadísticas (Memoized)
  const stats = useMemo(() => {
    if (!data.length) return null;

    let totalCapital = 0;
    let totalSeguro = 0;
    let totalPlazo = 0;
    let count = 0;

    // Agrupación por Fecha
    const timelineMap = {};
    // Agrupación por Clave Orgánica Combinada
    const branchMap = {};
    // Agrupación por Plazo (Rangos)
    const plazoMap = { 'Corto (<12m)': 0, 'Medio (12-36m)': 0, 'Largo (>36m)': 0 };

    data.forEach(item => {
      const capital = parseFloat(item.CAPITAL) || 0;
      const seguro = parseFloat(item.SEGURO) || 0;
      const plazo = parseInt(item.PLAZO) || 0;
      
      if (capital > 0) {
        count++;
        totalCapital += capital;
        totalSeguro += seguro;
        totalPlazo += plazo;

        // Timeline
        const date = item.FOTORGAMIENTO || 'Sin Fecha';
        if (!timelineMap[date]) timelineMap[date] = { date, capital: 0, seguro: 0, count: 0 };
        timelineMap[date].capital += capital;
        timelineMap[date].seguro += seguro;
        timelineMap[date].count += 1;

        // Branch (Orgánica 0 + Orgánica 1)
        const org0 = item.CLAVE_ORGANICA_0 || '?';
        const org1 = item.CLAVE_ORGANICA_1 || '?';
        const branch = `Org ${org0}-${org1}`; // Concatenación solicitada
        
        if (!branchMap[branch]) branchMap[branch] = { name: branch, capital: 0, count: 0 };
        branchMap[branch].capital += capital;
        branchMap[branch].count += 1;

        // Plazo
        if (plazo < 12) plazoMap['Corto (<12m)']++;
        else if (plazo <= 36) plazoMap['Medio (12-36m)']++;
        else plazoMap['Largo (>36m)']++;
      }
    });

    // Formatear arrays para gráficas
    const timelineData = Object.values(timelineMap).sort((a, b) => new Date(a.date) - new Date(b.date));
    const branchData = Object.values(branchMap).sort((a, b) => b.capital - a.capital).slice(0, 15); // Top 15 para ver más detalle
    const plazoData = Object.entries(plazoMap).map(([name, value]) => ({ name, value }));

    return {
      totalCapital,
      totalSeguro,
      avgTicket: count ? totalCapital / count : 0,
      avgPlazo: count ? totalPlazo / count : 0,
      count,
      timelineData,
      branchData,
      plazoData
    };
  }, [data]);

  // Lógica de Filtrado y Ordenamiento
  const processedTableData = useMemo(() => {
    let result = [...data];

    // 1. Filtrado
    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(lowerFilter)
        )
      );
    }

    // 2. Ordenamiento
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Manejo especial para números
        if (['CAPITAL', 'SEGURO', 'PLAZO', 'INTERNO', 'NO_PRESTAMO', 'TOTAL_RESPALDO_SEG'].includes(sortConfig.key)) {
            valA = parseFloat(valA) || 0;
            valB = parseFloat(valB) || 0;
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filterText, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) return <ArrowUpDown size={14} className="text-slate-300" />;
    if (sortConfig.direction === 'asc') return <ArrowUp size={14} className="text-blue-600" />;
    return <ArrowDown size={14} className="text-blue-600" />;
  };

  const formatCurrency = (val) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header Ejecutivo */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="text-blue-400" />
              Tablero de Control: Préstamos y Seguros
            </h1>
            <p className="text-slate-400 text-sm mt-1">Análisis de rendimiento y colocación</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors text-sm font-medium">
                <Upload size={16} />
                <span>Cargar CSV Actualizado</span>
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
             </label>
             <div className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">
                {fileName}
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            title="Capital Total Colocado" 
            value={formatCurrency(stats.totalCapital)} 
            icon={DollarSign} 
            subtext={`${stats.count} préstamos activos`}
          />
          <Card 
            title="Primas de Seguro Totales" 
            value={formatCurrency(stats.totalSeguro)} 
            icon={ShieldCheck} 
            subtext="Total acumulado en primas"
          />
          <Card 
            title="Promedio por Préstamo" 
            value={formatCurrency(stats.avgTicket)} 
            icon={TrendingUp} 
            subtext="Monto promedio financiado"
          />
          <Card 
            title="Plazo Promedio" 
            value={`${stats.avgPlazo.toFixed(1)} Semanas`} 
            icon={Calendar} 
            subtext="Duración media del contrato"
          />
        </div>

        {/* Sección de Gráficas Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Gráfica de Tendencia (Ocupa 2 columnas) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                Evolución de Colocación (Capital vs Seguros)
              </h2>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSeguro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#64748b" />
                  <YAxis tickFormatter={(value) => `$${value/1000}k`} stroke="#64748b" />
                  <RechartsTooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="capital" name="Capital Colocado" stroke="#0088FE" fillOpacity={1} fill="url(#colorCapital)" />
                  <Area type="monotone" dataKey="seguro" name="Monto Seguro" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSeguro)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfica de Donut (Plazos) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <PieIcon size={20} className="text-purple-600" />
              Distribución por Plazo
            </h2>
            <div className="h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.plazoData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.plazoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="text-3xl font-bold text-slate-800">{stats.count}</span>
                  <p className="text-xs text-slate-500 uppercase">Créditos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fila Inferior de Gráficas - Ahora Top Orgánicas toma ancho completo */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* Top Sucursales/Orgánicas Combinadas */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Users size={20} className="text-orange-600" />
              Top Claves Orgánicas por Capital (Clave 0 - Clave 1)
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.branchData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} angle={-45} textAnchor="end" interval={0} height={60} />
                  <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                  <RechartsTooltip 
                    cursor={{fill: '#f1f5f9'}}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Bar dataKey="capital" name="Capital" fill="#0088FE" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Tabla Detallada con Filtros y Ordenamiento */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
            {/* Header de la Tabla */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="font-semibold text-slate-700">Detalle de Operaciones</h3>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  {/* Buscador */}
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Buscar en todos los campos..." 
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                    />
                  </div>

                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center gap-1 whitespace-nowrap">
                      <Download size={14} /> Exportar
                  </button>
                </div>
            </div>

            {/* Cuerpo de la Tabla con Scroll */}
            <div className="overflow-auto flex-1">
                <table className="w-full text-sm text-left relative min-w-[1500px]">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 min-w-[100px]" onClick={() => requestSort('INTERNO')}>
                              <div className="flex items-center gap-1">Interno {getSortIcon('INTERNO')}</div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 min-w-[100px]" onClick={() => requestSort('NO_PRESTAMO')}>
                              <div className="flex items-center gap-1">No. Prest {getSortIcon('NO_PRESTAMO')}</div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 min-w-[120px]" onClick={() => requestSort('FSOLICITUD')}>
                              <div className="flex items-center gap-1">F. Solicitud {getSortIcon('FSOLICITUD')}</div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 min-w-[120px]" onClick={() => requestSort('FOTORGAMIENTO')}>
                              <div className="flex items-center gap-1">F. Otorg. {getSortIcon('FOTORGAMIENTO')}</div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('CLAVE_ORGANICA_0')}>Org 0</th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('CLAVE_ORGANICA_1')}>Org 1</th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('CLAVE_ORGANICA_2')}>Org 2</th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('CLAVE_ORGANICA_3')}>Org 3</th>
                            <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100" onClick={() => requestSort('PLAZO')}>
                              <div className="flex items-center justify-end gap-1">Plazo {getSortIcon('PLAZO')}</div>
                            </th>
                            <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 min-w-[120px]" onClick={() => requestSort('CAPITAL')}>
                              <div className="flex items-center justify-end gap-1">Capital {getSortIcon('CAPITAL')}</div>
                            </th>
                            <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 min-w-[120px]" onClick={() => requestSort('SEGURO')}>
                              <div className="flex items-center justify-end gap-1">Seguro {getSortIcon('SEGURO')}</div>
                            </th>
                             <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 min-w-[120px]" onClick={() => requestSort('TOTAL_RESPALDO_SEG')}>
                              <div className="flex items-center justify-end gap-1">Respaldo {getSortIcon('TOTAL_RESPALDO_SEG')}</div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 min-w-[120px]" onClick={() => requestSort('FECHA_INICIO')}>
                              <div className="flex items-center gap-1">F. Inicio {getSortIcon('FECHA_INICIO')}</div>
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 min-w-[120px]" onClick={() => requestSort('FECHA_FIN')}>
                              <div className="flex items-center gap-1">F. Fin {getSortIcon('FECHA_FIN')}</div>
                            </th>
                            <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedTableData.length > 0 ? (
                          processedTableData.map((row, idx) => (
                              <tr key={idx} className="bg-white border-b hover:bg-slate-50">
                                  <td className="px-4 py-3 font-medium text-slate-900">{row.INTERNO}</td>
                                  <td className="px-4 py-3 text-slate-500">{row.NO_PRESTAMO}</td>
                                  <td className="px-4 py-3 text-xs">{row.FSOLICITUD}</td>
                                  <td className="px-4 py-3 text-xs">{row.FOTORGAMIENTO}</td>
                                  <td className="px-4 py-3 text-center">{row.CLAVE_ORGANICA_0}</td>
                                  <td className="px-4 py-3 text-center">{row.CLAVE_ORGANICA_1}</td>
                                  <td className="px-4 py-3 text-center">{row.CLAVE_ORGANICA_2}</td>
                                  <td className="px-4 py-3 text-center">{row.CLAVE_ORGANICA_3}</td>
                                  <td className="px-4 py-3 text-right">{row.PLAZO}</td>
                                  <td className="px-4 py-3 text-right font-medium text-blue-600">{formatCurrency(row.CAPITAL)}</td>
                                  <td className="px-4 py-3 text-right text-emerald-600">{formatCurrency(row.SEGURO)}</td>
                                  <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(row.TOTAL_RESPALDO_SEG)}</td>
                                  <td className="px-4 py-3 text-xs">{row.FECHA_INICIO}</td>
                                  <td className="px-4 py-3 text-xs">{row.FECHA_FIN}</td>
                                  <td className="px-4 py-3 text-center">
                                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">
                                          {row.STATUS}
                                      </span>
                                  </td>
                              </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="15" className="px-6 py-8 text-center text-slate-400">
                              No se encontraron resultados para "{filterText}"
                            </td>
                          </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
                <span>Mostrando {processedTableData.length} registros</span>
                {filterText && <span className="text-blue-600">Filtro activo: "{filterText}"</span>}
            </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;