using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AddSelectors : MonoBehaviour
{
  private List<GameObject> selectors;
  public GameObject SelectorPrefab;
  public GameObject EdgePrefab;
  private bool active = false;
  public int vertexCoverSize = 3;
  public GameObject graph;
  // Start is called before the first frame update
  void Start()
  {
    selectors = new List<GameObject>();
    for (int i = 0; i < vertexCoverSize; i++)
    {
      GameObject selector = Instantiate(SelectorPrefab, new Vector3(graph.transform.position.x - (3 * i), graph.transform.position.y, graph.transform.position.z - 10), Quaternion.identity);
      selector.SetActive(active);
      selectors.Add(selector);
    }
    foreach(GameObject selector in selectors)
    {
      foreach (Transform child in graph.transform)
      {
        Debug.Log("kk");
        GameObject childGameObject = child.gameObject;
        childGameObject.GetComponent<Node>().SetEdgePrefab(EdgePrefab);
        childGameObject.GetComponent<Node>().AddEdge(selector.GetComponent<Node>());
      }
    }
    
  }

    // Update is called once per frame
    void Update()
    {
      for (int i = 0; i< selectors.ToArray().Length; i++)
      {
        selectors[i].SetActive(active);
        //selectors[i].transform.position = new Vector3(graph.transform.position.x - (3 * i), graph.transform.position.y - (3 * i), graph.transform.position.z - 10);
      }
      if (Input.GetKeyDown(KeyCode.Escape))
      {
          active = !active;
      }
    }

  //public void AddEdge(GameObject go)
  //{
  //  //SpringJoint sj = gameObject.AddComponent<SpringJoint>();
  //  //sj.autoConfigureConnectedAnchor = false;
  //  //sj.anchor = new Vector3(0, 0.5f, 0);
  //  //sj.connectedAnchor = new Vector3(0, 0, 0);
  //  //sj.enableCollision = true;
  //  //sj.connectedBody = go.GetComponent<Rigidbody>();
  //  GameObject edge = Instantiate(this.epf, new Vector3(transform.position.x, transform.position.y, transform.position.z), Quaternion.identity);
  //  edge.tag = "edge";
  //  edges.Add(edge);
  //  targets.Add(go);
  //}

}
