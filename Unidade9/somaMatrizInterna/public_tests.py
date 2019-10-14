import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
soma_matriz_interna = getattr(undertest, 'soma_matriz_interna', None)

class PublicTests(unittest.TestCase):

    def test_1(self):
        M2 = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]
        soma = soma_matriz_interna(M2, (1,1), (2,2))
        print(soma)
        assert soma_matriz_interna(M2, (1,1),(2,2)) == 5 + 6 + 8 + 9

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
