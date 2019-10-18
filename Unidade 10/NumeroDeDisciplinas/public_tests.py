import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
numero_disciplinas = getattr(undertest, 'numero_disciplinas', None)

class PublicTests(unittest.TestCase):

   def teste1(self):
        grade = {"p1": [], "lp1": [], "ic": [],"calc1": [], "p2": ["ic", "p1", "lp1"],
        "lp2": ["ic", "p1", "lp1"], "grafos": ["ic", "p1", "lp1"], "calc2"  : ["calc1"], 
        "edados": ["ic", "p1", "lp1", "p2", "lp2", "grafos"],
        "leda": ["ic", "p1", "lp1", "p2", "lp2", "grafos"]}

        horarios= {"p1": "s082", "lp1": "x082", "ic": "i142", "calc1": "q082", "p2": "t162",
        "lp2": "s082", "grafos": "q082", "calc2": "x162", "edados": "x162", "leda": "t102"}

        assert numero_disciplinas(grade, horarios, []) == 4
        assert numero_disciplinas(grade, horarios, ["ic", "p1", "lp1"]) == 3

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
