using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VCtoHC : MonoBehaviour
{
  private GraphVC graph;
  // Start is called before the first frame update
  void Start()
    {
      graph = new GraphVC("Assets/3d_graph_layout_unity-master/Resources/instance1.graph");

      GraphVC hc = VCToHCConverter.VC2HC(graph, 3);
      Debug.Log(hc);
      Debug.Log(Application.dataPath);
      System.IO.File.WriteAllText(Application.dataPath + "/output.txt", hc.ToString());
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
