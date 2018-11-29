/* 
 * Fichero:   main.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Fichero principal. 
 * 
 * Creado el 8 de diciembre de 2017, 10:41
 */

#include <cstdlib>
#include <iostream>
#include "CirHam.h"

using namespace std;

int main(int argc, char** argv) {
    CirHam algoritmo;
    algoritmo.cargarCircuito();
    algoritmo.resolverCircuito();
    return 0;
}

