/* 
 * Fichero:   Grafo.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para tratar de representar y obtener la entrada del grafo del que se parte
 *           para construir el circuito.
 * 
 * Creado el 8 de diciembre de 2017, 10:50
 */

#ifndef GRAFO_H
#define GRAFO_H
#include "Arista.h" 
#include <vector>
#include <iostream>

using namespace std;
class Grafo {
public:
    Grafo();
    Grafo(const Grafo& orig);
    virtual ~Grafo();
    
    void addArista(Arista valor);
    void addNodo(Nodo valor);
    
    /* Funciones de acceso */
    void setIdent(string valor);
    string getIdent() const;
    vector<Nodo> getNodos() const;
    vector<Arista> getAristas() const;
    
protected:
    string ident; /* Identificador del grafo */
    vector<Nodo> nodos; 
    vector<Arista> aristas;

private:
    
};

#endif /* GRAFO_H */

