import unittest
import sys

module = sys.argv[-1].split(".py")[0]

class PublicTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        global top_3
        undertest = __import__(module)
        top_3 = getattr(undertest, 'top_3', None)

    def test_exemplo(self):
        l = [1,2,3,4,8,22,-3,5]
        top_3(l)
        assert l[0] == 22 and l[1] == 8 and l[2] == 5
        assert len(l) == 8

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
