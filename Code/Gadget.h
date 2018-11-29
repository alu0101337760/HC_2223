/* 
 * Fichero:   Gadget.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para la repserentacion de los subgrafos del circuito hamiltoniano
 * 
 * Creado el 8 de diciembre de 2017, 12:54
 */

#ifndef GADGET_H
#define GADGET_H
#include "Grafo.h"
using namespace std;

class Gadget : public Grafo{
public:
    Gadget(string nombre);
    Gadget(const Gadget& orig);
    virtual ~Gadget();
    
    void generarNodos(string nGrafo);
    void generarAristas();
    int conectGadgets();

    /* Funciones de acceso */
    vector<int> getExtLibres() const;
    vector<int> getExtOcupados() const;
    void setExtLibres(vector<int> valor);
    void setExtOcupados(vector<int> valor);
    
private:
    vector<int> extLibres;
    vector<int> extOcupados;
};

#endif /* GADGET_H */

