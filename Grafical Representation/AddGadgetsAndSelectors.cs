using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AddGadgetsAndSelectors : MonoBehaviour
{
  private GameObject[] edges;
  private List<GameObject> gadgets;
  private List<GameObject> selectors;
  public GameObject GadgetPrefab;
  public GameObject SelectorPrefab;
  private bool active = false;
  public int vertexCoverSize = 3;
  public GameObject graph;
    // Start is called before the first frame update
    void Start()
    {
      edges = GameObject.FindGameObjectsWithTag("edge");
      selectors = new List<GameObject>();
      gadgets = new List<GameObject>();
      foreach(GameObject edge in edges)
      {
        GameObject gadget = Instantiate(GadgetPrefab, new Vector3(edge.transform.position.x, edge.transform.position.y, edge.transform.position.z), Quaternion.identity);
        gadgets.Add(gadget);
        gadget.SetActive(active);
      }
      for(int i = 0; i < vertexCoverSize; i++)
      {
        GameObject selector = Instantiate(SelectorPrefab, new Vector3(graph.transform.position.x - (3 * i), graph.transform.position.y, graph.transform.position.z - 10), Quaternion.identity);
        selector.SetActive(active);
        selectors.Add(selector);
      }
    }

    // Update is called once per frame
    void Update()
    {
      for (int i = 0; i < gadgets.ToArray().Length; i++)
      {
        gadgets[i].SetActive(active);
        gadgets[i].transform.localPosition = edges[i].transform.position;
        gadgets[i].transform.LookAt(edges[i].transform.position);
      }
      for (int i = 0; i < selectors.ToArray().Length; i++)
      {
        selectors[i].SetActive(active);
        selectors[i].transform.position = new Vector3(graph.transform.position.x - (3 * i), graph.transform.position.y - (3 * i), graph.transform.position.z - 10);
      }
    if (Input.GetKeyDown(KeyCode.Space))
      {
        active = !active;
      }
    }
}
