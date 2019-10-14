import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
busca_matriz = getattr(undertest, 'busca_matriz', None)

class PublicTests(unittest.TestCase):
    def test_exemplo_1(self):
        matriz = [
            [2, 3, 5, 3, 1],
            [3, 2, 1, 5, 6],
            [1, 2, 3, 2, 1],
        ]
        assert busca_matriz(matriz, 4) == []

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
