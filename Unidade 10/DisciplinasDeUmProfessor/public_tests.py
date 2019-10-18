import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
disciplinas = getattr(undertest, 'disciplinas', None)

class PublicTests(unittest.TestCase):
   
    def test_exemplo(self):
        alocacao = {("P1", 4): ['Jorge', 'Dalton','Wilkerson'],
                    ("LP1", 4): ['Jorge', 'Dalton', 'Eliane', 'Wilkerson'],
                    ("EVOL", 2): ['Dalton'],
                    ("IC", 4): ['Eliane', 'Joseana'],
                    ("P2", 4): ['Livia', 'Raquel', 'Nazareno'],
                    ("GRAFOS", 2): ['Patricia', 'Patricia']}

        assert set(disciplinas(alocacao, "Dalton")[0]) == set(['P1', 'LP1', 'EVOL'])
        assert disciplinas(alocacao, "Dalton")[1] == 10
        assert set(disciplinas(alocacao, "Eliane")[0]) == set(['LP1', 'IC'])
        assert disciplinas(alocacao, "Eliane")[1] == 8
        assert set(disciplinas(alocacao, "Patricia")[0]) == set(['GRAFOS'])
        assert disciplinas(alocacao, "Patricia")[1] == 4

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
