using System;
namespace HC_2223_Project
{
    public class Program
    {
        public static void Main(string filename)
        {
            Console.WriteLine(VCToHCConverter.VC2HC(new Graph(filename)));
        }
    }
}