/* 
 * Fichero:   VC.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Representacion de una entrada del vertex cover
 * 
 * Creado el 8 de diciembre de 2017, 15:59
 */

#ifndef VC_H
#define VC_H
#include "Grafo.h"
#include <fstream>
#include <regex>

using namespace std;
class VC : public Grafo{
public:
    VC();
    VC(const VC& orig);
    virtual ~VC();
    
    void cargarVC(string nomFichero);
    void generarNodos(int numNodos);
    void addNodCubri(Nodo valor);
    bool enCubrimiento(Nodo valor);
    string imprimir();
    /* Funciones de acceso */
    void setCubrimiento(vector<Nodo> valor);
    vector<Nodo> getCubrimiento(); 
private:
    vector<Nodo> cubrimiento;
};

#endif /* VC_H */

