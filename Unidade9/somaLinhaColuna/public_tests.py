import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
soma_linha_e_coluna = getattr(undertest, 'soma_linha_e_coluna', None)

class AcceptanceTests(unittest.TestCase):

    def test_exemplo_1(self):
        matriz = [
            [2, 3, 5, 3, 1],
            [3, 2, 1, 5, 6],
            [3, 2, 3, 2, 1],
        ]

    
        assert soma_linha_e_coluna(matriz,1,1) == 20
        assert soma_linha_e_coluna(matriz,0,0) == 18

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
