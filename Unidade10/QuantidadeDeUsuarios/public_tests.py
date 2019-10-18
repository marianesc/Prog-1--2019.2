import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
quantidade_usuarios = getattr(undertest, 'quantidade_usuarios', None)

class PublicTests(unittest.TestCase):
 
    def test_example(self):

        lsd = {1234:['Andrey'], 1226:['Nazareno', 'Livia'], 9999:['administrador'] }
        deq = {1114:['Ana'] }

        assert quantidade_usuarios(lsd) == 3
        assert quantidade_usuarios(deq) == 1

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
