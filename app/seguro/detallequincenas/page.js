'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ArrowRight, AlertCircle, Banknote, Clock, 
  Flag, Shield, LayoutDashboard, 
  Hourglass, Upload, FileText, ChevronDown, ChevronUp, Search, Hash, Filter, X
} from 'lucide-react';

// --- COMPONENTE: Visualizador de Línea de Tiempo (Puro) ---
const TimelineVisualizer = ({ grantCode, startCode, endCode, insuranceAmount }) => {
  const [quincenas, setQuincenas] = useState([]);
  const [groupedQuincenas, setGroupedQuincenas] = useState({});
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const scrollContainerRef = useRef(null);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const shortMonthNames = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

  const parseCode = (code) => {
    if (!code || code.length !== 4 || isNaN(code)) return null;
    const q = parseInt(code.substring(0, 2), 10);
    const y = parseInt(code.substring(2, 4), 10) + 2000;
    if (q < 1 || q > 24) return null;
    return { q, y, abs: (y * 24) + q };
  };

  useEffect(() => {
    const calculate = () => {
      setError('');
      const grant = parseCode(grantCode);
      const start = parseCode(startCode);
      const end = parseCode(endCode);
      const insTotal = parseFloat(insuranceAmount) || 0;

      if (!grant || !start || !end) {
        setError('Códigos de fecha inválidos en los datos.');
        return;
      }
      if (grant.abs > start.abs || start.abs > end.abs) {
        setError('Inconsistencia en la cronología de fechas.');
        return;
      }
      if (end.abs - grant.abs > 24 * 15) {
         setError('El periodo excede el límite de visualización (15 años).');
         return;
      }

      // 1. Calcular Seguro (Periodo de Gracia)
      let insuranceQuotasCount = 0;
      let tempAbs = grant.abs;
      while (tempAbs < start.abs) { 
          const currentQ = ((tempAbs - 1) % 24) + 1;
          if (currentQ % 2 !== 0) insuranceQuotasCount++;
          tempAbs++;
      }
      const insurancePerQuota = insuranceQuotasCount > 0 ? (insTotal / insuranceQuotasCount) : 0;
      const loanDuration = (end.abs - start.abs) + 1;

      // 2. Generar Datos
      const result = [];
      let currentAbs = grant.abs; 
      let insurancePaidCount = 0;

      while (currentAbs <= end.abs) {
        const currentY = Math.floor((currentAbs - 1) / 24);
        const currentQ = ((currentAbs - 1) % 24) + 1; 
        const monthIndex = Math.ceil(currentQ / 2) - 1;
        const isFirstOfByte = currentQ % 2 !== 0; 
        const monthQNumber = isFirstOfByte ? 1 : 2; 

        const isGranting = currentAbs === grant.abs;
        const isPaymentStart = currentAbs === start.abs;
        const isPaymentPeriod = currentAbs >= start.abs && currentAbs <= end.abs;
        const isGracePeriod = currentAbs < start.abs;

        let curInsuranceAmt = 0;
        let isInsurancePayment = false;

        if (isFirstOfByte && isGracePeriod && insurancePaidCount < insuranceQuotasCount) {
          curInsuranceAmt = insurancePerQuota;
          isInsurancePayment = true;
          insurancePaidCount++;
        }

        result.push({
          id: currentAbs,
          year: currentY,
          qNumber: currentQ,          
          monthQNumber: monthQNumber, 
          monthName: monthNames[monthIndex],
          shortMonthName: shortMonthNames[monthIndex],
          isFirst: isFirstOfByte,
          code: `${currentQ.toString().padStart(2, '0')}${currentY.toString().substring(2)}`,
          insurance: { isActive: isInsurancePayment, amount: curInsuranceAmt },
          status: { isGranting, isPaymentStart, isPaymentPeriod, isGracePeriod }
        });
        currentAbs++;
      }

      setSummary({
        loanDuration,
        countInsurance: insurancePaidCount,
        insurancePerQuota: insurancePerQuota
      });

      setQuincenas(result);
      
      const grouped = result.reduce((acc, curr) => {
          const year = curr.year;
          if (!acc[year]) acc[year] = [];
          acc[year].push(curr);
          return acc;
      }, {});
      setGroupedQuincenas(grouped);
    };

    calculate();
  }, [grantCode, startCode, endCode, insuranceAmount]);

  if (error) return <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg flex items-center gap-2"><AlertCircle className="w-4 h-4"/> {error}</div>;
  if (quincenas.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mt-4 animate-in slide-in-from-top-2 duration-300">
      {/* KPI Mini Header */}
      <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-slate-200">
         <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg"><Hourglass className="w-4 h-4"/></div>
            <div>
               <p className="text-[10px] uppercase font-bold text-slate-400">Plazo Pago</p>
               <p className="font-bold text-slate-700">{summary?.loanDuration} Qs</p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg"><Shield className="w-4 h-4"/></div>
            <div>
               <p className="text-[10px] uppercase font-bold text-slate-400">Cuota Seguro</p>
               <p className="font-bold text-slate-700">${summary?.insurancePerQuota.toFixed(2)} <span className="text-xs font-normal text-slate-400">x {summary?.countInsurance}</span></p>
            </div>
         </div>
      </div>

      {/* Timeline Scroll */}
      <div ref={scrollContainerRef} className="overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex gap-8 min-w-max">
          {Object.keys(groupedQuincenas).map((year) => (
              <div key={year} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-300">{year}</span>
                      <div className="h-px bg-slate-200 w-12"></div>
                  </div>
                  <div className="flex gap-2">
                      {groupedQuincenas[year].map((q) => (
                          <div key={q.id} className={`
                              relative w-28 h-36 rounded-lg border flex flex-col justify-between overflow-hidden
                              ${q.status.isGracePeriod ? 'bg-white border-slate-200 opacity-75' : 'bg-white border-blue-200 shadow-sm'}
                              ${q.status.isGranting ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                              ${q.status.isPaymentStart ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}
                          `}>
                              <div className={`h-1 w-full ${q.status.isGracePeriod ? 'bg-slate-100' : 'bg-blue-500'}`}></div>
                              <div className="p-2 flex-1 flex flex-col justify-between">
                                  <div className="flex justify-between items-start">
                                      <span className="text-[10px] font-bold uppercase text-slate-400">{q.shortMonthName}</span>
                                      <span className="text-[9px] font-mono text-slate-300">{q.code}</span>
                                  </div>
                                  <div className="text-center py-1">
                                      <span className={`text-base font-bold ${q.status.isGracePeriod ? 'text-slate-400' : 'text-slate-700'}`}>Q{q.monthQNumber}</span>
                                      {q.status.isGranting && <div className="text-[9px] bg-blue-50 text-blue-600 px-1 rounded font-bold mt-1">OTORGA</div>}
                                      {q.status.isPaymentStart && <div className="text-[9px] bg-emerald-50 text-emerald-600 px-1 rounded font-bold mt-1">INICIO</div>}
                                  </div>
                                  <div className="h-6 flex items-end justify-center">
                                      {q.insurance.isActive ? (
                                          <div className="bg-orange-50 w-full rounded text-center border border-orange-100">
                                              <span className="text-[9px] font-bold text-orange-500">-${q.insurance.amount.toFixed(0)}</span>
                                          </div>
                                      ) : <div className="w-1 h-1 bg-slate-100 rounded-full"></div>}
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (Página) ---
export default function CreditAnalyzerPage() {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedId, setExpandedId] = useState(null);
  const [fileError, setFileError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      try {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) throw new Error("El archivo CSV parece estar vacío o sin datos.");
        
        const headers = lines[0].split(',').map(h => h.trim());
        const parsedData = lines.slice(1).map((line, idx) => {
          const values = line.split(',').map(v => v.trim());
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index];
          });
          row._id = idx;
          return row;
        });
        
        setData(parsedData);
        setFileError('');
      } catch (err) {
        setFileError('Error al leer el CSV: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Helper para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Intentar detectar formato ISO YYYY-MM-DD
    const isoDate = new Date(dateString);
    if (!isNaN(isoDate.getTime()) && dateString.includes('-')) {
      return isoDate.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    // Si no es ISO, devolver como está (asumiendo que ya viene formateado o es texto libre)
    return dateString;
  };

  const processedData = useMemo(() => {
    let result = [...data];

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(item => 
            (item.INTERNO?.toLowerCase() || '').includes(term) ||
            (item.PRESTAMO?.toLowerCase() || '').includes(term) ||
            (item.QUINCENA_OTORGAMIENTO || '').includes(term) ||
            (item.FECHA || '').includes(term)
        );
    }

    if (sortConfig.key) {
        result.sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];

            const cleanA = typeof valA === 'string' ? valA.replace(/[$,]/g, '') : valA;
            const cleanB = typeof valB === 'string' ? valB.replace(/[$,]/g, '') : valB;

            const numA = parseFloat(cleanA);
            const numB = parseFloat(cleanB);

            const isNum = !isNaN(numA) && isFinite(numA) && !isNaN(numB) && isFinite(numB);
            
            if (isNum) {
                if (numA < numB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (numA > numB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            } else {
                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            }
        });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const SortIcon = ({ columnKey }) => {
    const isActive = sortConfig.key === columnKey;
    return (
      <span className="inline-block ml-1">
        {isActive ? (
           sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3 text-blue-600" /> : <ChevronDown className="w-3 h-3 text-blue-600" />
        ) : (
           <ChevronDown className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </span>
    );
  };

  // Definición de columnas para la tabla responsiva
  const tableColumns = [
    { key: 'INTERNO', label: 'Interno', width: 'w-24', align: 'left' },
    { key: 'PRESTAMO', label: 'Préstamo #', width: 'w-28', align: 'left' },
    { key: 'QUINCENA_OTORGAMIENTO', label: 'Otorg.', width: 'w-24', align: 'center' },
    { key: 'QUINCENA_INICIO', label: 'Inicio', width: 'w-24', align: 'center' },
    { key: 'CAPITAL', label: 'Capital', width: 'w-32', align: 'right', isMoney: true },
    { key: 'FECHA', label: 'Fecha', width: 'w-28', align: 'center', isDate: true },
    { key: 'SEGURO_INICIAL', label: 'Seg. Ini.', width: 'w-28', align: 'right', isMoney: true },
    { key: 'SEGURO_PRESTAMO', label: 'Seg. Pres.', width: 'w-28', align: 'right', isMoney: true },
    { key: 'TOTAL_NUEVO_SEGURO', label: 'Seg. Tot.', width: 'w-28', align: 'right', isMoney: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-[95%] mx-auto space-y-6">
        
        {/* Header Principal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/20">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              Analizador de Quincenas de Créditos
            </h1>
            <p className="text-slate-500 mt-1 ml-1">Análisis</p>
          </div>
          
          <div className="flex gap-4 items-center">
              <div className="relative group">
                 <input 
                    type="file" 
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                 />
                 <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-blue-100 shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                        <Upload className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-700">Cargar CSV</p>
                        <p className="text-xs text-slate-400">Arrastra o clic aquí</p>
                    </div>
                 </div>
              </div>
          </div>
        </div>

        {fileError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {fileError}
          </div>
        )}

        {/* Tabla Completa */}
        {data.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
             
             {/* Barra de Búsqueda Integrada */}
             <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center sticky top-0 z-30 rounded-t-2xl">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar por interno, préstamo o fecha..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {processedData.length} Registros
                </div>
             </div>

             {/* Contenedor de Tabla con Scroll Horizontal */}
             <div className="overflow-x-auto custom-scrollbar">
               <div className="min-w-max">
                 
                 {/* Header Row */}
                 <div className="flex bg-slate-50 border-b border-slate-200">
                    {tableColumns.map((col) => (
                      <div 
                        key={col.key}
                        className={`
                          ${col.width} px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 flex items-center group select-none
                          ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'}
                        `}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label} <SortIcon columnKey={col.key} />
                      </div>
                    ))}
                    <div className="w-16 px-4 py-3 text-right"></div>
                 </div>

                 {/* Data Rows */}
                 <div className="divide-y divide-slate-100">
                    {processedData.length > 0 ? processedData.map((row) => {
                        const isOpen = expandedId === row._id;
                        return (
                            <div key={row._id} className="group transition-colors">
                                {/* Row Principal */}
                                <div 
                                    className={`flex items-center hover:bg-slate-50 cursor-pointer transition-colors ${isOpen ? 'bg-blue-50/50' : ''}`}
                                    onClick={() => toggleExpand(row._id)}
                                >
                                    {tableColumns.map((col) => (
                                      <div 
                                        key={col.key}
                                        className={`
                                          ${col.width} px-4 py-3 text-sm whitespace-nowrap
                                          ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}
                                        `}
                                      >
                                        <span className={`
                                            ${col.key === 'INTERNO' ? 'font-mono font-bold text-slate-700' : ''}
                                            ${col.key === 'QUINCENA_OTORGAMIENTO' ? 'bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-mono font-bold' : ''}
                                            ${col.key === 'QUINCENA_INICIO' ? 'bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-mono font-bold' : ''}
                                            ${col.isMoney ? 'font-medium text-slate-700' : 'text-slate-600'}
                                        `}>
                                            {col.isMoney 
                                              ? `$${parseFloat(row[col.key] || 0).toLocaleString()}` 
                                              : (col.isDate 
                                                  ? formatDate(row[col.key])
                                                  : (col.key === 'PRESTAMO' ? <span className="flex items-center gap-1"><Hash className="w-3 h-3 text-slate-400"/> {row[col.key]}</span> : row[col.key])
                                                )
                                            }
                                        </span>
                                      </div>
                                    ))}
                                    
                                    {/* Flecha Acción */}
                                    <div className="w-16 px-4 py-3 flex justify-end">
                                        <button className={`p-1.5 rounded-full transition-transform ${isOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'text-slate-300 hover:bg-slate-100'}`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Panel Expandido */}
                                {isOpen && (
                                    <div className="bg-slate-50/50 border-b border-blue-100 shadow-inner px-4 py-4">
                                        <div className="max-w-[98%] mx-auto bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="h-6 w-1 bg-blue-500 rounded-full"></div>
                                                <h4 className="text-sm font-bold text-slate-700">Análisis de Línea de Tiempo</h4>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
                                                <div><span className="font-bold block text-slate-400">Interno</span> {row.INTERNO}</div>
                                                <div><span className="font-bold block text-slate-400">Préstamo</span> {row.PRESTAMO}</div>
                                                <div><span className="font-bold block text-slate-400">Fin Préstamo</span> {row.QUINCENA_FIN}</div>
                                                <div><span className="font-bold block text-slate-400">Q1 Transcurridas</span> {row.Q1_TRANSCURRIDAS}</div>
                                                <div><span className="font-bold block text-slate-400">Fecha Carga</span> {row.FECHA}</div>
                                            </div>
                                            
                                            <TimelineVisualizer 
                                                grantCode={row.QUINCENA_OTORGAMIENTO}
                                                startCode={row.QUINCENA_INICIO}
                                                endCode={row.QUINCENA_FIN}
                                                insuranceAmount={row.SEGURO_INICIAL}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }) : (
                        <div className="p-12 text-center text-slate-400">
                            <Filter className="w-12 h-12 mx-auto mb-3 text-slate-200" />
                            <p className="font-medium">No se encontraron resultados</p>
                            <p className="text-xs mt-1">Intenta ajustar tu búsqueda</p>
                        </div>
                    )}
                 </div>
               </div>
             </div>
             
             {/* Footer Tabla */}
             <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between rounded-b-2xl">
                <span>Total Registros: {data.length}</span>
                <span>Mostrando {processedData.length}</span>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 transition-colors">
             <div className="bg-slate-50 p-6 rounded-full mb-4 animate-bounce">
                <FileText className="w-12 h-12 text-blue-300" />
             </div>
             <h3 className="text-lg font-bold text-slate-600">Comienza tu análisis</h3>
             <p className="max-w-md text-center mt-2 mb-6">Carga un archivo CSV para visualizar la proyección financiera y cronogramas de seguros.</p>
             <label className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 transform hover:-translate-y-1">
                <Upload className="w-5 h-5" /> Seleccionar CSV
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
             </label>
             <p className="text-[10px] mt-4 text-slate-300 bg-slate-50 px-3 py-1 rounded-full">Formato: INTERNO, PRESTAMO, CAPITAL, FECHA, SEGUROS, QUINCENAS...</p>
          </div>
        )}

      </div>
    </div>
  );
}