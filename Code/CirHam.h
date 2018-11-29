/* 
 * Fichero: CirHam.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para la construccion del circuito hamiltoniano
 * 
 * Creado el 9 de diciembre de 2017, 15:18
 */

#ifndef CIRHAM_H
#define CIRHAM_H
#include "VC.h"
#include "Gadget.h"

class CirHam {
public:
    CirHam();
    CirHam(const CirHam& orig);
    virtual ~CirHam();
    
    void addGadget(Gadget valor);
    void cargarCircuito();
    void resolverCircuito();
    void conectarGadgets(Gadget &a, Gadget &b);
    void conGadgetsNodo(Grafo &a);
    void generarIdNodos(Grafo completo);
    vector<Arista> getAristasNodo(string idNodo);
    bool adyacencia(string nodoB, vector<Arista> aristasA);
    bool esAniadible(int ultNodo, int nodoAct, bool **matAdy, bool visitado[]);
    bool calcularCircuito(bool **matAdy, bool visitado[], int camino[], int pos);
    
    /* Funciones de acceso */
    vector<Gadget> getGadgets() const;
    vector<string> getIdNodos() const;
    Grafo getCompleto() const;
    int getNumNodos() const;
    void setNumNodos(int valor);
    
private:
    vector<Gadget> gadgets;
    vector<string> idNodos; /* Vector para almacenar todos los id de los nodos */ 
    Grafo completo;
    int numNodos; /* Numero de nodos del grafo completo,  incluido los gadget */
    
};

#endif /* CIRHAM_H */

