/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var Trie = /** @class */ (function () {
    class Trie {
        constructor(content) {
            if (((typeof content === 'string') || content === null)) {
                var __args = arguments;
                if (this.children === undefined) {
                    this.children = null;
                }
                if (this.content === undefined) {
                    this.content = null;
                }
                this.terminal = false;
                this.content = content;
                this.children = ({});
            }
            else if (content === undefined) {
                var __args = arguments;
                {
                    var __args_1 = arguments;
                    var content_1 = null;
                    if (this.children === undefined) {
                        this.children = null;
                    }
                    if (this.content === undefined) {
                        this.content = null;
                    }
                    this.terminal = false;
                    this.content = content_1;
                    this.children = ({});
                }
                if (this.children === undefined) {
                    this.children = null;
                }
                if (this.content === undefined) {
                    this.content = null;
                }
                this.terminal = false;
            }

            else
                throw new Error('invalid overload');
        }
        add(character) {
            var s;
            if (this.content == null) {
                s = character;
            }
            else {
                s = this.content + character;
            }
        /* put */ (function (m, k, v) {
                if (m.entries == null)
                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } });
            })(this.children, character, new Trie(s));
        }
        insert(diagnosis) {
            if (diagnosis == null) {
                throw Object.defineProperty(new Error("Null diagnoses entries are not valid."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
            }
            var node = this;
            {
                var array11143 = /* toCharArray */ (diagnosis).split('');
                for (var index11142 = 0; index11142 < array11143.length; index11142++) {
                    var c = array11143[index11142];
                    {
                        if (!(function (m, k) {
                            if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return true;
                                } return false;
                        })(node.children, c)) {
                            node.add(c);
                        }
                        node = /* get */ (function (m, k) {
                            if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return m.entries[i].value;
                                } return null;
                        })(node.children, c);
                    }
                }
            }
            node.terminal = true;
        }
        autoComplete(prefix) {
            var Trienode = this;
            {
                var array11145 = /* toCharArray */ (prefix).split('');
                for (var index11144 = 0; index11144 < array11145.length; index11144++) {
                    var c = array11145[index11144];
                    {
                        if (!(function (m, k) {
                            if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return true;
                                } return false;
                        })(Trienode.children, c)) {
                            return /* emptyList */[];
                        }
                        Trienode = /* get */ (function (m, k) {
                            if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return m.entries[i].value;
                                } return null;
                        })(Trienode.children, c);
                        // console.info(Trienode.content);
                    }
                }
            }
            return Trienode.allPrefixes();
        }
        allPrefixes() {
            var diagnosisresults = ([]);
            if (this.terminal) {
            /* add */ (diagnosisresults.push(this.content) > 0);
            }
            {
                var array11147 = /* entrySet */ (function (m) {
                    if (m.entries == null)
                        m.entries = []; return m.entries;
                })(this.children);
                for (var index11146 = 0; index11146 < array11147.length; index11146++) {
                    var entry = array11147[index11146];
                    {
                        var child = entry.getValue();
                        var childPrefixes = child.allPrefixes();
                    /* addAll */ (function (l1, l2) { return l1.push.apply(l1, l2); })(diagnosisresults, childPrefixes);
                    }
                }
            }
            return diagnosisresults;
        }
    }
    return Trie;
}());
Trie["__class"] = "Trie";

var trie = new Trie(null);

for(var w in unigrams){
    trie.insert(w);
}

function getMostCnt(lastWord, arr) {
    var max_cnt = 0;
    var max_cnt_word = "";
    var wordFreq_this;
    if (lastWord in bigrams) {
        wordFreq_this = bigrams[lastWord];
    } else {
        wordFreq_this = unigrams;
    }
    for (var i = 0; i < arr.length; i++) {
        word = arr[i];
        cnt = wordFreq_this[word];
        // console.log(word,cnt);
        if (cnt > max_cnt) {
            max_cnt = cnt;
            max_cnt_word = word;
        }
    } 
    if (max_cnt == 0) { // fall back to unigrams
        for (var i = 0; i < arr.length; i++) {
            word = arr[i];
            cnt = unigrams[word];
            // console.log(word,cnt);
            if (cnt > max_cnt) {
                max_cnt = cnt;
                max_cnt_word = word;
            }
        } 
    }
    console.log(max_cnt, max_cnt_word);
    return max_cnt_word;
}

function getSuggestion(lastWord, currTyped) {
    out = trie.autoComplete(currTyped);
    best = getMostCnt(lastWord, out);
    return best;
}