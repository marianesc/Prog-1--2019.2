import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
senha_segura = getattr(undertest, 'senha_segura', None)

class PublicTests(unittest.TestCase):

    def test_basico_1(self):
        assert senha_segura("12346") == "Senha insegura"

    def test_basico_2(self):
        assert senha_segura("125638") == "Senha segura"

        
        
if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
