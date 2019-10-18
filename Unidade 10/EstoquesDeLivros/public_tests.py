import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
ausentes = getattr(undertest, 'ausentes', None)

class PublicTests(unittest.TestCase):
    def test_exemplo(self):
        livros = { "Metamorfose": 30, "O Principe": 0, "Vigiar e Punir": 0, "Dumbo": 22}
        assert ausentes(livros) == 2

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
