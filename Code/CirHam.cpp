/* 
 * Fichero: CirHam.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para la construccion del circuito hamiltoniano
 * 
 * Creado el 9 de diciembre de 2017, 15:18
 */

#include "CirHam.h"

CirHam::CirHam() {
}

CirHam::CirHam(const CirHam& orig) {
    
}

CirHam::~CirHam() {
}

void CirHam::cargarCircuito(){
    string nombreFichero;
    VC vertex;
    cout << "Ruta del fichero que contiene la salida del Vertex Cover: " << endl;
    cin >> nombreFichero;
    vertex.cargarVC(nombreFichero);
    for(int i = 0; i < vertex.getAristas().size(); i++){
        string idGadget = "GD";
        if(vertex.enCubrimiento(vertex.getAristas()[i].getNodoA())){
            idGadget += vertex.getAristas()[i].getNodoA().getId() + "-" + vertex.getAristas()[i].getNodoB().getId();
        }
        else{
            idGadget += vertex.getAristas()[i].getNodoB().getId() + "-" + vertex.getAristas()[i].getNodoA().getId();
        }
        Gadget aux(idGadget);
        addGadget(aux);
    }
    
    for(int i = 0;  i < vertex.getCubrimiento().size(); i++){
        /* Incluimos un nodo nuevo por cada uno en el cubrimiento */
        Nodo nuevo; 
        string idNuevo = "nodHc" + to_string(i+1);
        nuevo.setId(idNuevo);
        completo.addNodo(nuevo);
       
        /* Si el gadget pertenece a una arista de ese vertice hacemos las conecciones*/
        int indGg1 = -1; /* Indice de los gadgets */
        int indGg2 = -1;
        
        for(int j = 0;  j < getGadgets().size(); j++){
            if(getGadgets()[j].getIdent().find(vertex.getCubrimiento()[i].getId())!= string::npos){
                if(indGg1 == -1){
                    indGg1 = j;
                }
                else{
                    if(indGg2 == -1){
                        indGg2 = j;
                    }
                }    
                if((indGg2 != -1) && (indGg1 != -1)){
                    /* Unimos los gadget correspondientes */
                    conectarGadgets(gadgets[indGg1], gadgets[indGg2]);
                    
                    Arista aux;
                    aux.setNodoA(getGadgets()[indGg1].getNodos()[getGadgets()[indGg1].getExtOcupados().back()]); 
                    aux.setNodoB(getGadgets()[indGg2].getNodos()[getGadgets()[indGg2].getExtOcupados().back()]);
                    completo.addArista(aux);
                    /* Reiniciamos los indices  y dejamos la j estatica de cara a la siguiente iteracion*/ 
                    indGg1 = -1; 
                    indGg2 = -1;
                    j--;
                }
            }
        }
    }
    /* Conectamos los nodos libres de los gadgets y los nuevos */
    conGadgetsNodo(completo);
}


void CirHam::resolverCircuito(){
    /* Obtenemos todas las id de los nodos*/
    generarIdNodos(getCompleto()); 
    /* Creamos la matriz de adyacencia */
    setNumNodos(getIdNodos().size());
    cout << "Numero de nodos en el grafo " << getNumNodos() << endl;
    
    bool **matAdy;
    matAdy = new bool *[getNumNodos()];
    int *camino = new int[getNumNodos()];
    bool *visitado = new bool[getNumNodos()];
    
    for(int i = 0;  i < getNumNodos();i++){
        matAdy[i] = new bool[getNumNodos()];
        camino[i] = -1;
        visitado[i] = false;
    }
    
    for (int i = 0;  i < getNumNodos(); i++){
        /* Obtenemos las aristas asociadas a cada nodo */
        vector<Arista> aux;
        aux = getAristasNodo(getIdNodos()[i]);
        for (int j = 0; j < getNumNodos(); j++){
            if(i == j){
                matAdy[i][j] = false;
            }
            else if(adyacencia(getIdNodos()[j], aux)){
                matAdy[i][j] = true;
            }
            else {
                matAdy[i][j] = false;
            }
        }
    }
    
    /* Añadimos el id del primer nodo al camino */
    camino[0] = 0;
    visitado[0] = true;
    if ( !calcularCircuito(matAdy, visitado, camino, 1)){
            cout << "\nNo existe solucion" << endl;
    }
    else{
        cout << "Existe solucion: " << endl;
        for (int i = 0;  i < getNumNodos(); i++){
            cout << " " << camino[i];
        }
        /* Añadimos el primer nodo que es a su vez el ultimo*/
        cout << " " << camino[0] << endl;
    }
}

void CirHam::addGadget(Gadget valor){
    gadgets.push_back(valor);
}

/*Funcion usada para conectar los gadget entre si*/
void CirHam::conectarGadgets(Gadget &a, Gadget &b){
    int indiceA = a.getExtLibres()[0];
    int indiceB = b.getExtLibres()[0];
    vector<int> aux; 
    
    /* Obtenemos y eliminamos el elemento libre */
    aux = a.getExtLibres();
    aux.erase(aux.begin());
    a.setExtLibres(aux);
    
    aux = b.getExtLibres();
    aux.erase(aux.begin());
    b.setExtLibres(aux);
    
    /* Insertamos el elemento que ahora está ocupado */
    aux.clear();
    aux = a.getExtOcupados();
    aux.push_back(indiceA);
    a.setExtOcupados(aux);
    
    aux.clear();
    aux = b.getExtOcupados();
    aux.push_back(indiceB);
    b.setExtOcupados(aux);
    
}

void CirHam::conGadgetsNodo(Grafo& a){
    Arista nodoGadget;
    for(int j = 0;  j < getGadgets().size(); j++){
        if(getGadgets()[j].getExtLibres().size() > 0){
            while(getGadgets()[j].getExtLibres().size() > 0){
                Nodo b = gadgets[j].getNodos()[gadgets[j].conectGadgets()];
                nodoGadget.setNodoB(b);
                for(int i =0;  i < a.getNodos().size(); i++){
                    nodoGadget.setNodoA(a.getNodos()[i]);
                    a.addArista(nodoGadget);
                }
            }
        }
    }
}

/* Si pongo el grafo en la clase quitar el argumento*/
void CirHam::generarIdNodos(Grafo  completo){
    for(int i = 0;  i < completo.getNodos().size(); i++){
        idNodos.push_back(completo.getNodos()[i].getId());
    }
    
    for(int i = 0; i < getGadgets().size(); i++){
        for(int j = 0;  j < getGadgets()[i].getNodos().size(); j++){
            idNodos.push_back(getGadgets()[i].getNodos()[j].getId());
        }
    }
}

/* Aristas que conectan con este nodo */
vector<Arista> CirHam::getAristasNodo(string idNodo){
    vector<Arista> todas; /*Todas las aristas incluidas las de los gadgets */
    vector<Arista> aux; /* Arista que si contienen este nodo */ 
    todas = getCompleto().getAristas(); /* Primero añadimos las del grafo */
    /*Añadimos las de los gadgets*/
    for(int i = 0;  i < getGadgets().size(); i++){
        for(int j = 0;  j < getGadgets()[i].getAristas().size();j++){
            todas.push_back(getGadgets()[i].getAristas()[j]);
        }
    }
    
    /* Buscamos y añadimos aquellas que si estan */
    for(int i = 0;  i < todas.size(); i++){
        if(todas[i].contNodo(idNodo)){
            aux.push_back(todas[i]);
        }
    }
    return aux;
}


/* Comprobamos que el nodo B se encuentra en las aristas del nodo A (Mediante el id)*/
bool CirHam::adyacencia(string nodoB, vector<Arista> aristasA){
    for(int i = 0; i < aristasA.size(); i++){
        if(aristasA[i].contNodo(nodoB)){
            return true;
        }
    }
    return false;

}

bool CirHam::esAniadible(int ultNodo, int nodoAct, bool **matAdy, bool visitado[]){
    if(visitado[nodoAct] || matAdy[ultNodo][nodoAct] != 1){
        return false;
    }
    return true;
}

/* Funcion recursiva para el calculo del circuito hamiltoniano*/
bool CirHam::calcularCircuito(bool **matAdy, bool visitado[], int camino[], int pos){
    /* Condicion de parada: Todos los nodos incluidos en V*/
    if (pos == getNumNodos()){
        /* Y si el último vertice añadido es igual al primero*/
        if ( matAdy[camino[pos-1]][camino[0]] == 1 )
           return true;
        else
          return false;
    }
    /* Buscamos el siguiente candidato para el circuito */
    for (int i = 1; i < getNumNodos(); i++){
        /* Comprueba si es añadible */
        if(esAniadible(camino[pos-1], i, matAdy, visitado)){
            visitado[i] = true;
            camino[pos] = i;
            /* Llamada recursiva para construir el resto del circuito*/
            if (calcularCircuito(matAdy, visitado, camino, pos+1)){
                return true;
            }
            /* Si el nodo que añadimos no lleva a una solucion,  la eliminamos */
            visitado[i] = false;
            camino[pos] = -1;
        }
    }
    /* Si no hay mas nodos que añadir devolveremos falso */
    return false;
}

/* Funciones de acceso */
vector<Gadget> CirHam::getGadgets() const{
    return gadgets;
}

vector<string> CirHam::getIdNodos() const{
    return idNodos;
}

Grafo CirHam::getCompleto() const{
    return completo;
}

int CirHam::getNumNodos() const{
    return numNodos;
}

void CirHam::setNumNodos(int valor){
    numNodos = valor;
}