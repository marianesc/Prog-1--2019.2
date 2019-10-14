import unittest
import sys

module = sys.argv[-1].split(".py")[0]

class PublicTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        global caixa_alta
        undertest = __import__(module)
        caixa_alta = getattr(undertest, 'caixa_alta', None)

    def test_exemplo(self):
        assert caixa_alta("A primeira letra de cada palavra") == "a Primeira Letra De Cada Palavra"

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
