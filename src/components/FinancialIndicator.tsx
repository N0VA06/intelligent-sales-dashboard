
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { financialMetrics } from './FinancialMetrics';
import KPICard from './KPICard';
import { toast } from 'sonner';
import ComparisonChart from './ComparisonChart';

type CategoryType = 'liquidity' | 'solvency' | 'profitability' | 'operation' | 'budget';

// Mapeo entre tipos de categoría de UI y nombres de categoría de datos
const categoryMap: Record<CategoryType, string> = {
  liquidity: 'Liquidez',
  solvency: 'Solvencia',
  profitability: 'Rentabilidad',
  operation: 'Operación',
  budget: 'Presupuesto'
};

const FinancialIndicator = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('liquidity');
  
  // Filtrar métricas por categoría usando el mapeo
  const getMetricsByCategory = (category: CategoryType) => {
    return financialMetrics.filter(metric => metric.category === category);
  };
  
  const handleCategoryChange = (value: string) => {
    // Validamos que el valor sea una categoría válida
    if (value in categoryMap) {
      setActiveCategory(value as CategoryType);
      toast.success(`Mostrando indicadores de ${categoryMap[value as CategoryType]}`);
    }
  };
  
  const filteredMetrics = getMetricsByCategory(activeCategory);
  
  return (
    <Card className="glass-card backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Indicadores Financieros Clave</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="liquidity" 
          value={activeCategory} 
          onValueChange={handleCategoryChange}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="liquidity">Liquidez</TabsTrigger>
            <TabsTrigger value="solvency">Solvencia</TabsTrigger>
            <TabsTrigger value="profitability">Rentabilidad</TabsTrigger>
            <TabsTrigger value="operation">Operación</TabsTrigger>
            <TabsTrigger value="budget">Presupuesto</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMetrics.map((metric, index) => (
                  <KPICard key={metric.id} metric={metric} delay={index} />
                ))}
              </div>
              
              {filteredMetrics.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMetrics.slice(0, 2).map((metric) => (
                    <ComparisonChart 
                      key={`chart-${metric.id}`}
                      metric={metric} 
                      type={metric.id.includes('total') ? 'bar' : 'line'} 
                    />
                  ))}
                </div>
              )}

              {filteredMetrics.length > 2 && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
                  <h3 className="text-base font-medium mb-2">Análisis General: {categoryMap[activeCategory]}</h3>
                  <p className="text-sm text-balance">
                    {getAnalysisByCategoryType(activeCategory)}
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Función para obtener un análisis según la categoría
const getAnalysisByCategoryType = (category: CategoryType): string => {
  switch(category) {
    case 'liquidity':
      return "Los indicadores de liquidez muestran una preocupante tendencia a la baja desde 2015. La liquidez corriente ha caído por debajo de 1.0, indicando que la universidad no tiene suficientes activos corrientes para cubrir sus obligaciones a corto plazo. El capital de trabajo negativo confirma la gravedad de esta situación.";
    case 'solvency':
      return "La situación de solvencia es alarmante. El índice de endeudamiento ha aumentado constantemente, mientras que la cobertura de intereses ha caído a valores negativos. Esto indica que la universidad está cada vez más endeudada y no genera suficientes recursos para cubrir sus compromisos financieros.";
    case 'profitability':
      return "Los indicadores de rentabilidad muestran resultados negativos, con tendencia a empeorar. El margen operacional y neto están en valores negativos, señalando que la universidad está operando a pérdida. El EBITDA negativo confirma esta situación crítica.";
    case 'operation':
      return "Los indicadores operacionales reflejan ineficiencias significativas. Los gastos operacionales superan a los ingresos totales y el costo por alumno supera al ingreso por alumno, creando un déficit estructural que requiere intervención urgente.";
    case 'budget':
      return "La ejecución presupuestaria muestra un sobregasto consistente, lo que agrava la situación financiera general. Es necesario implementar controles presupuestarios más estrictos y una planificación financiera realista basada en la capacidad real de generación de ingresos.";
    default:
      return "Análisis no disponible para esta categoría.";
  }
};

export default FinancialIndicator;
