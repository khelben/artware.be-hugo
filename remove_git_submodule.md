# how to remove a git submodule

```bash
# 1. Deinit the submodule (removes config for it)
git submodule deinit -f path/to/submodule

# 2. Remove its Git repository stored under .git/modules
rm -rf .git/modules/path/to/submodule

# 3. Remove the submodule from index, working tree, and .gitmodules
git rm -f path/to/submodule

# 4. Commit the removal
git commit -m "Remove submodule path/to/submodule"
```
